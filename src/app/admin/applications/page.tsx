import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getStudentApplications } from "@/lib/actions/student.actions";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import ApplicationsManager from "@/components/admin/ApplicationsManager";
import { StudentApplicationData } from "@/types";

export const revalidate = 0;

export default async function AdminApplicationsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const applications = (await getStudentApplications()) as unknown as StudentApplicationData[];

  return (
    <AdminLayoutWrapper adminEmail={session.email}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Talent Pipeline
            </div>
            <h1 className="text-2xl md:text-3xl font-mono uppercase text-white font-semibold">
              Student Applications
            </h1>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Total Candidates: {applications.length}
          </div>
        </div>

        <ApplicationsManager initialApplications={applications} />
      </div>
    </AdminLayoutWrapper>
  );
}
