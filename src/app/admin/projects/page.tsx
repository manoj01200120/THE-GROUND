import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getPublicProjects } from "@/lib/actions/project.actions";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import AdminProjectsManager from "@/components/admin/AdminProjectsManager";
import { ProjectData } from "@/types";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = (await getPublicProjects()) as unknown as ProjectData[];

  return (
    <AdminLayoutWrapper adminEmail={session.email}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3EBDD]/10 pb-6">
          <div>
            <div className="text-xs font-heading uppercase tracking-widest text-[#9DB9D0]">
              Operations & Sprints
            </div>
            <h1 className="text-2xl md:text-3xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.1em]">
              Project Management
            </h1>
          </div>
          <div className="text-xs font-heading text-[#9DB9D0]/80">
            Active Projects: {projects.length}
          </div>
        </div>

        <AdminProjectsManager initialProjects={projects} />
      </div>
    </AdminLayoutWrapper>
  );
}
