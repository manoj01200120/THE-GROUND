"use server";

import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { createAdminToken, setAdminSessionCookie, clearAdminSessionCookie, getAdminSession } from "@/lib/auth/session";

export async function adminLogin(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please enter both admin email and password." };
  }

  const expectedAdminEmail = (process.env.ADMIN_EMAIL || "contact.theground@gmail.com").toLowerCase().trim();
  const expectedAdminPassword = process.env.ADMIN_PASSWORD;

  try {
    let admin = await prisma.admin.findUnique({
      where: { email },
    });

    // If admin is not yet in the DB but matches the environment credentials, bootstrap
    if (!admin && email === expectedAdminEmail && expectedAdminPassword) {
      if (password === expectedAdminPassword) {
        const passwordHash = await bcrypt.hash(expectedAdminPassword, 10);
        admin = await prisma.admin.create({
          data: {
            email: expectedAdminEmail,
            name: "THE GROUND Lead Admin",
            passwordHash,
            role: "ADMIN",
          },
        });
      }
    }

    if (!admin) {
      return { success: false, error: "Invalid email or credentials." };
    }

    // Verify password against stored hash or fallback env password
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    const isEnvMatch = expectedAdminPassword && password === expectedAdminPassword;

    if (!isMatch && !isEnvMatch) {
      return { success: false, error: "Invalid email or credentials." };
    }

    const token = await createAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setAdminSessionCookie(token);

    try {
      await prisma.activityLog.create({
        data: {
          action: "ADMIN_LOGIN",
          details: `Admin ${admin.email} authenticated successfully`,
          adminEmail: admin.email,
        },
      });
    } catch {
      // safe fallback
    }

    return { success: true };
  } catch (error) {
    console.error("[ADMIN_LOGIN_ERROR]", error);
    return {
      success: false,
      error: "Authentication service encountered a problem. Please verify database connectivity.",
    };
  }
}

export async function adminLogout() {
  await clearAdminSessionCookie();
  return { success: true };
}

export async function getAdminOverviewStats() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  try {
    const [
      totalApplications,
      pendingApplications,
      reviewingApplications,
      shortlistedApplications,
      acceptedApplications,
      rejectedApplications,
      totalInquiries,
      newInquiries,
      contactedInquiries,
      inDiscussionInquiries,
      acceptedInquiries,
      completedInquiries,
      totalProjects,
      activeProjects,
      recentLogs,
    ] = await Promise.all([
      prisma.studentApplication.count(),
      prisma.studentApplication.count({ where: { status: "PENDING" } }),
      prisma.studentApplication.count({ where: { status: "REVIEWING" } }),
      prisma.studentApplication.count({ where: { status: "SHORTLISTED" } }),
      prisma.studentApplication.count({ where: { status: "ACCEPTED" } }),
      prisma.studentApplication.count({ where: { status: "REJECTED" } }),
      prisma.clientInquiry.count(),
      prisma.clientInquiry.count({ where: { status: "NEW" } }),
      prisma.clientInquiry.count({ where: { status: "CONTACTED" } }),
      prisma.clientInquiry.count({ where: { status: "IN_DISCUSSION" } }),
      prisma.clientInquiry.count({ where: { status: "ACCEPTED" } }),
      prisma.clientInquiry.count({ where: { status: "COMPLETED" } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: "ACTIVE" } }),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      totalApplications,
      pendingApplications,
      reviewingApplications,
      shortlistedApplications,
      acceptedApplications,
      rejectedApplications,
      totalInquiries,
      newInquiries,
      contactedInquiries,
      inDiscussionInquiries,
      acceptedInquiries,
      completedInquiries,
      totalProjects,
      activeProjects,
      recentLogs: recentLogs.map((log) => ({
        ...log,
        createdAt: log.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("[ADMIN_STATS_ERROR]", error);
    return {
      totalApplications: 0,
      pendingApplications: 0,
      reviewingApplications: 0,
      shortlistedApplications: 0,
      acceptedApplications: 0,
      rejectedApplications: 0,
      totalInquiries: 0,
      newInquiries: 0,
      contactedInquiries: 0,
      inDiscussionInquiries: 0,
      acceptedInquiries: 0,
      completedInquiries: 0,
      totalProjects: 0,
      activeProjects: 0,
      recentLogs: [],
    };
  }
}
