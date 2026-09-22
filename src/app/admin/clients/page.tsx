import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getClientInquiries } from "@/lib/actions/client.actions";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import ClientInquiriesManager from "@/components/admin/ClientInquiriesManager";
import { ClientInquiryData } from "@/types";

export const revalidate = 0;

export default async function AdminClientsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const inquiries = (await getClientInquiries()) as unknown as ClientInquiryData[];

  return (
    <AdminLayoutWrapper adminEmail={session.email}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Commercial Pipeline
            </div>
            <h1 className="text-2xl md:text-3xl font-mono uppercase text-white font-semibold">
              Client Inquiries
            </h1>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Total Inquiries: {inquiries.length}
          </div>
        </div>

        <ClientInquiriesManager initialInquiries={inquiries} />
      </div>
    </AdminLayoutWrapper>
  );
}
