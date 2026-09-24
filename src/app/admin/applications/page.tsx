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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3EBDD]/10 pb-6">
          <div>
            <div className="text-xs font-heading uppercase tracking-widest text-[#9DB9D0]">
              Builder Community
            </div>
            <h1 className="text-2xl md:text-3xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.1em]">
              Student Registrations
            </h1>
          </div>
          <div className="text-xs font-heading text-[#9DB9D0]/80">
            Total Registrations: {applications.length}
          </div>
        </div>

        <ApplicationsManager initialApplications={applications} />
      </div>
    </AdminLayoutWrapper>
  );
}
