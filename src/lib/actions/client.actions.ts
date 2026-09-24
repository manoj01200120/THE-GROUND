"use server";

import { prisma } from "@/lib/db/prisma";
import { clientInquirySchema, ClientInquiryInput } from "@/lib/validation/client.schema";
import { getAdminSession } from "@/lib/auth/session";
import { InquiryStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function submitClientInquiry(input: ClientInquiryInput) {
  try {
    const validated = clientInquirySchema.parse(input);

    const inquiry = await prisma.clientInquiry.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        companyOrOrganization: validated.companyOrOrganization,
        role: validated.role,
        problem: validated.problem,
        desiredOutcome: validated.desiredOutcome,
        budget: validated.budget,
        currency: validated.currency,
        timeline: validated.timeline,
        additionalInformation: validated.additionalInformation || null,
        status: "NEW",
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          action: "CLIENT_INQUIRY_SUBMITTED",
          details: `Inquiry received from ${inquiry.name} at ${inquiry.companyOrOrganization} (${inquiry.email})`,
        },
      });
    } catch (logErr) {
      console.warn("[ACTIVITY_LOG_WARNING] Could not record client activity log:", logErr);
    }

    return {
      success: true,
      inquiryId: inquiry.id,
    };
  } catch (error: unknown) {
    // Log technical error securely on the server
    console.error("[CLIENT_INQUIRY_ERROR]", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      return {
        success: false,
        error: "Please verify all required inquiry fields and try submitting again.",
      };
    }

    // Generic, safe user-facing message preventing any exposure of SQL/Prisma details
    return {
      success: false,
      error: "Unable to record inquiry due to a database service error. Please try again in a few moments or email contact.theground@gmail.com directly.",
    };
  }
}

export async function getClientInquiries(filters?: { search?: string; status?: string }) {
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
        { name: { contains: term, mode: "insensitive" } },
        { companyOrOrganization: { contains: term, mode: "insensitive" } },
        { email: { contains: term, mode: "insensitive" } },
        { problem: { contains: term, mode: "insensitive" } },
        { desiredOutcome: { contains: term, mode: "insensitive" } },
      ];
    }

    const inquiries = await prisma.clientInquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return inquiries.map((inq) => ({
      ...inq,
      createdAt: inq.createdAt.toISOString(),
      updatedAt: inq.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("[GET_CLIENT_INQUIRIES_ERROR]", error);
    return [];
  }
}

export async function updateClientInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNotes?: string
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  try {
    const updated = await prisma.clientInquiry.update({
      where: { id },
      data: {
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          action: "CLIENT_INQUIRY_STATUS_UPDATED",
          details: `Inquiry for ${updated.companyOrOrganization} status updated to ${status}`,
          adminEmail: session.email,
        },
      });
    } catch {
      // safe fallback
    }

    revalidatePath("/admin/clients");
    return { success: true, updated };
  } catch (error) {
    console.error("[UPDATE_CLIENT_INQUIRY_STATUS_ERROR]", error);
    return { success: false, error: "Failed to update inquiry status." };
  }
}
