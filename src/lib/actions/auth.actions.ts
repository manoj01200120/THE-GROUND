"use server";

import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { createAdminToken, setAdminSessionCookie, clearAdminSessionCookie, getAdminSession } from "@/lib/auth/session";

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please provide both email and password." };
  }

  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!admin) {
    return { success: false, error: "Invalid email or credentials." };
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return { success: false, error: "Invalid email or credentials." };
  }

  const token = await createAdminToken({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  await setAdminSessionCookie(token);

  await prisma.activityLog.create({
    data: {
      action: "ADMIN_LOGIN",
      details: `Admin ${admin.email} logged in successfully`,
      adminEmail: admin.email,
    },
  });

  return { success: true };
}

export async function adminLogout() {
  await clearAdminSessionCookie();
  return { success: true };
}

export async function getAdminOverviewStats() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const [
    totalApplications,
    pendingApplications,
    shortlistedApplications,
    acceptedApplications,
    totalProjects,
    activeProjects,
    totalInquiries,
    newInquiries,
    recentLogs,
  ] = await Promise.all([
    prisma.studentApplication.count(),
    prisma.studentApplication.count({ where: { status: "PENDING" } }),
    prisma.studentApplication.count({ where: { status: "SHORTLISTED" } }),
    prisma.studentApplication.count({ where: { status: "ACCEPTED" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.clientInquiry.count(),
    prisma.clientInquiry.count({ where: { status: "NEW" } }),
    prisma.activityLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    totalApplications,
    pendingApplications,
    shortlistedApplications,
    acceptedApplications,
    totalProjects,
    activeProjects,
    totalInquiries,
    newInquiries,
    recentLogs: recentLogs.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
  };
}
