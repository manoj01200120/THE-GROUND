"use server";

import { prisma } from "@/lib/db/prisma";
import { studentApplicationSchema, StudentApplicationInput } from "@/lib/validation/student.schema";
import { getAdminSession } from "@/lib/auth/session";
import { ApplicationStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function submitStudentApplication(input: StudentApplicationInput) {
  try {
    const validated = studentApplicationSchema.parse(input);

    // Check for existing application by email
    const existing = await prisma.studentApplication.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return {
        success: false,
        error: "An application with this email address has already been registered. Reach out to contact.theground@gmail.com if you wish to update your details.",
      };
    }

    const application = await prisma.studentApplication.create({
      data: {
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        collegeOrOrganization: validated.collegeOrOrganization,
        currentStatus: validated.currentStatus,
        courseOrRole: validated.courseOrRole || null,
        yearOrSemester: validated.yearOrSemester || null,
        status: "PENDING",
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          action: "APPLICATION_SUBMITTED",
          details: `Application received from ${application.fullName} (${application.email}) - ${application.collegeOrOrganization}`,
        },
      });
    } catch (logErr) {
      console.warn("[ACTIVITY_LOG_WARNING] Could not record activity log:", logErr);
    }

    return {
      success: true,
      applicationId: application.id,
    };
  } catch (error: unknown) {
    // Log technical error securely on the server
    console.error("[STUDENT_APPLICATION_ERROR]", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      return {
        success: false,
        error: "Please review the form fields and correct the highlighted errors.",
      };
    }

    // Generic, safe user-facing message preventing any exposure of SQL/Prisma details
    return {
      success: false,
      error: "Unable to process application due to a database service issue. Please try again shortly or reach out to contact.theground@gmail.com.",
    };
  }
}

export async function getStudentApplications(filters?: {
  search?: string;
  status?: string;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  try {
    const whereClause: Record<string, unknown> = {};

    if (filters?.status && filters.status !== "ALL") {
      whereClause.status = filters.status;
    }

    if (filters?.search && filters.search.trim() !== "") {
      const term = filters.search.trim();
      whereClause.OR = [
        { fullName: { contains: term, mode: "insensitive" } },
        { email: { contains: term, mode: "insensitive" } },
        { collegeOrOrganization: { contains: term, mode: "insensitive" } },
        { currentStatus: { contains: term, mode: "insensitive" } },
        { courseOrRole: { contains: term, mode: "insensitive" } },
      ];
    }

    const applications = await prisma.studentApplication.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return applications.map((app) => ({
      ...app,
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("[GET_STUDENT_APPLICATIONS_ERROR]", error);
    return [];
  }
}

export async function updateStudentApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  try {
    const updated = await prisma.studentApplication.update({
      where: { id },
      data: {
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          action: "APPLICATION_STATUS_UPDATED",
          details: `Status of ${updated.fullName} changed to ${status}`,
          adminEmail: session.email,
        },
      });
    } catch {
      // safe fallback
    }

    revalidatePath("/admin/applications");
    return { success: true, updated };
  } catch (error) {
    console.error("[UPDATE_STUDENT_STATUS_ERROR]", error);
    return { success: false, error: "Failed to update application status." };
  }
}
