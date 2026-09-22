"use server";

import { prisma } from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";
import { ProjectStage, ProjectStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function getPublicProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return projects.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      deadline: p.deadline ? p.deadline.toISOString() : null,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(data: {
  name: string;
  description: string;
  problem: string;
  owner: string;
  stage: ProjectStage;
  status: ProjectStatus;
  progress: number;
  client?: string;
  deadline?: string;
  members: { name: string; role: string; email: string }[];
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      problem: data.problem,
      owner: data.owner,
      stage: data.stage,
      status: data.status,
      progress: data.progress,
      client: data.client || null,
      deadline: data.deadline ? new Date(data.deadline) : null,
      members: {
        create: data.members.map((m) => ({
          name: m.name,
          role: m.role,
          email: m.email,
        })),
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "PROJECT_CREATED",
      details: `Project created: ${project.name} (Owner: ${project.owner})`,
      adminEmail: session.email,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true, project };
}

export async function updateProjectStage(
  id: string,
  data: {
    stage?: ProjectStage;
    status?: ProjectStatus;
    progress?: number;
    blockers?: string;
    outcome?: string;
  }
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized. Admin access required.");

  const updated = await prisma.project.update({
    where: { id },
    data,
  });

  await prisma.activityLog.create({
    data: {
      action: "PROJECT_STAGE_UPDATED",
      details: `Project ${id} updated to stage ${data.stage || updated.stage} (${data.progress ?? updated.progress}%)`,
      adminEmail: session.email,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true, updated };
}
