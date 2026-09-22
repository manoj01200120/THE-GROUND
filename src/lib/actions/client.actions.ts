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
        name: validated.name.trim(),
        company: validated.company.trim(),
        email: validated.email.toLowerCase().trim(),
        phone: validated.phone.trim(),
        role: validated.role.trim(),
        problem: validated.problem.trim(),
        expectedOutcome: validated.expectedOutcome.trim(),
        budget: validated.budget.trim(),
        timeline: validated.timeline.trim(),
        additionalInfo: validated.additionalInfo?.trim() || null,
        status: "NEW",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "CLIENT_INQUIRY_SUBMITTED",
        details: `New inquiry from ${inquiry.name} at ${inquiry.company} (${inquiry.email}) - Budget: ${inquiry.budget}`,
      },
    });

    return {
      success: true,
      inquiryId: inquiry.id,
    };
  } catch (error: unknown) {
    console.error("Client inquiry error:", error);
    const message = error instanceof Error ? error.message : "Failed to submit client inquiry. Please check your inputs.";
    return {
      success: false,
      error: message,
    };
  }
}

export async function getClientInquiries(filters?: { search?: string; status?: string }) {
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
      { company: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
      { problem: { contains: term, mode: "insensitive" } },
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
}

export async function updateClientInquiryStatus(
  id: string,
  status: InquiryStatus,
  notes?: string
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const updated = await prisma.clientInquiry.update({
    where: { id },
    data: {
      status,
      ...(notes !== undefined ? { notes } : {}),
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "CLIENT_INQUIRY_STATUS_UPDATED",
      details: `Inquiry ${id} (${updated.company}) status changed to ${status}`,
      adminEmail: session.email,
    },
  });

  revalidatePath("/admin/clients");
  return { success: true, updated };
}
