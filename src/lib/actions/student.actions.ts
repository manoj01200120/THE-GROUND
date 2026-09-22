"use server";

import { prisma } from "@/lib/db/prisma";
import { fullStudentApplicationSchema, StudentApplicationInput } from "@/lib/validation/student.schema";
import { getAdminSession } from "@/lib/auth/session";
import { ApplicationStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function submitStudentApplication(input: StudentApplicationInput) {
  try {
    const validated = fullStudentApplicationSchema.parse(input);

    // Check for existing application by email
    const existing = await prisma.studentApplication.findUnique({
      where: { email: validated.email.toLowerCase().trim() },
    });

    if (existing) {
      return {
        success: false,
        error: "An application with this email address has already been submitted.",
      };
    }

    const allSkills = [validated.primarySkill, ...validated.secondarySkills];

    const application = await prisma.studentApplication.create({
      data: {
        name: validated.name.trim(),
        email: validated.email.toLowerCase().trim(),
        phone: validated.phone.trim(),
        college: validated.college.trim(),
        course: validated.course.trim(),
        year: validated.year.trim(),
        city: validated.city.trim(),
        skills: JSON.stringify(allSkills),
        interests: `${validated.interests} [Idea/Build Target: ${validated.whatToBuild}]`,
        experience: `Level: ${validated.experienceLevel} | Motivation: ${validated.whyJoin} | Project Focus: ${validated.projectTypes.join(", ")}`,
        projects: validated.projects.trim(),
        learningGoals: validated.learningGoals.trim(),
        availability: validated.availability.trim(),
        portfolio: validated.portfolio?.trim() || null,
        github: validated.github?.trim() || null,
        linkedin: validated.linkedin?.trim() || null,
        resumeUrl: validated.resumeUrl?.trim() || null,
        status: "PENDING",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "STUDENT_APPLICATION_SUBMITTED",
        details: `Application received from ${application.name} (${application.email}) - College: ${application.college}`,
      },
    });

    return {
      success: true,
      applicationId: application.id,
    };
  } catch (error: unknown) {
    console.error("Student application error:", error);
    const message = error instanceof Error ? error.message : "Failed to submit application. Please check your inputs.";
    return {
      success: false,
      error: message,
    };
  }
}

export async function getStudentApplications(filters?: {
  search?: string;
  status?: string;
  skill?: string;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const whereClause: Record<string, unknown> = {};

  if (filters?.status && filters.status !== "ALL") {
    whereClause.status = filters.status;
  }

  if (filters?.search && filters.search.trim() !== "") {
    const term = filters.search.trim();
    whereClause.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
      { college: { contains: term, mode: "insensitive" } },
      { city: { contains: term, mode: "insensitive" } },
      { skills: { contains: term, mode: "insensitive" } },
    ];
  }

  if (filters?.skill && filters.skill !== "ALL") {
    whereClause.skills = { contains: filters.skill, mode: "insensitive" };
  }

  const applications = await prisma.studentApplication.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return applications.map((app) => ({
    ...app,
    skills: JSON.parse(app.skills || "[]") as string[],
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
  }));
}

export async function updateStudentApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const updated = await prisma.studentApplication.update({
    where: { id },
    data: {
      status,
      ...(notes !== undefined ? { notes } : {}),
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "APPLICATION_STATUS_UPDATED",
      details: `Status of application ${id} (${updated.name}) changed to ${status}`,
      adminEmail: session.email,
    },
  });

  revalidatePath("/admin/applications");
  return { success: true, updated };
}
