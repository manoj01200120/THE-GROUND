"use client";

import { useState } from "react";
import { StudentApplicationData, ApplicationStatus } from "@/types";
import { updateStudentApplicationStatus } from "@/lib/actions/student.actions";
import {
  Search,
  Eye,
  X,
  MessageSquare,
  User,
  Building,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";

interface Props {
  initialApplications: StudentApplicationData[];
}

const statuses: (ApplicationStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "REVIEWING",
  "SHORTLISTED",
  "ACCEPTED",
  "REJECTED",
];

export default function ApplicationsManager({ initialApplications }: Props) {
  const [applications, setApplications] = useState<StudentApplicationData[]>(initialApplications);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeModalApp, setActiveModalApp] = useState<StudentApplicationData | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [notesInput, setNotesInput] = useState<string>("");

  const filtered = applications.filter((app) => {
    const matchesStatus = selectedStatus === "ALL" || app.status === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.collegeOrOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.courseOrRole && app.courseOrRole.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (app: StudentApplicationData) => {
    setActiveModalApp(app);
    setNotesInput(app.adminNotes || "");
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!activeModalApp || !activeModalApp.id) return;
    setIsUpdating(true);

    try {
      await updateStudentApplicationStatus(activeModalApp.id, status, notesInput);
      setApplications((prev) =>
        prev.map((a) =>
          a.id === activeModalApp.id ? { ...a, status, adminNotes: notesInput } : a
        )
      );
      setActiveModalApp((prev) => (prev ? { ...prev, status, adminNotes: notesInput } : null));
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeModalApp || !activeModalApp.id) return;
    setIsUpdating(true);

    try {
      await updateStudentApplicationStatus(activeModalApp.id, activeModalApp.status || "PENDING", notesInput);
      setApplications((prev) =>
        prev.map((a) =>
          a.id === activeModalApp.id ? { ...a, adminNotes: notesInput } : a
        )
      );
    } catch (e) {
      console.error("Failed to save notes:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status?: ApplicationStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300";
      case "SHORTLISTED":
        return "bg-sky-500/20 border-sky-500/40 text-sky-300";
      case "REVIEWING":
        return "bg-[#6288A6]/30 border-[#9DB9D0]/40 text-[#F3EBDD]";
      case "REJECTED":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      default:
        return "bg-amber-500/20 border-amber-500/40 text-amber-300";
    }
  };

  const formatStatusType = (type: string) => {
    const normalized = (type || "").toUpperCase();
    if (normalized === "STUDENT") return "Student";
    if (normalized === "PROFESSIONAL") return "Working Professional";
    return "Other";
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 ground-card-dark rounded-xl border border-[#F3EBDD]/15">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#9DB9D0]/70 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate, email, college..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#071521]/70 border border-[#F3EBDD]/15 text-xs font-heading text-[#F3EBDD] placeholder:text-[#9DB9D0]/50 focus:outline-none focus:border-[#9DB9D0] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-heading uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === st
                  ? "bg-[#F3EBDD] text-[#071521] font-semibold shadow-sm"
                  : "bg-[#071521]/50 border border-[#F3EBDD]/10 text-[#9DB9D0] hover:text-[#F3EBDD] hover:bg-[#19334B]/60"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="ground-card-dark rounded-xl border border-[#F3EBDD]/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-heading text-xs">
            <thead className="border-b border-[#F3EBDD]/10 bg-[#071521]/60 text-[#9DB9D0] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">College / Organization</th>
                <th className="py-3 px-4">Course / Role</th>
                <th className="py-3 px-4">Year / Sem</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDD]/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#9DB9D0]/60">
                    No registrations match the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-[#19334B]/30 transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(app)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#F3EBDD]">{app.fullName}</div>
                      <div className="text-[11px] text-[#9DB9D0]/70 font-mono">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#9DB9D0]">
                      <span className="px-2 py-0.5 rounded bg-[#071521]/60 border border-[#F3EBDD]/10 text-[11px]">
                        {formatStatusType(app.currentStatus)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#F3EBDD]/90">
                      {app.collegeOrOrganization}
                    </td>
                    <td className="py-3.5 px-4 text-[#9DB9D0]">
                      {app.courseOrRole || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-[#9DB9D0]">
                      {app.yearOrSemester || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] uppercase font-medium tracking-wider ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(app);
                        }}
                        className="p-1.5 rounded-md hover:bg-[#F3EBDD]/10 text-[#9DB9D0] hover:text-[#F3EBDD] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="ground-card-dark rounded-2xl border border-[#F3EBDD]/20 p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalApp(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#071521]/60 text-[#9DB9D0] hover:text-[#F3EBDD] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-medium tracking-wider ${getStatusBadge(
                    activeModalApp.status
                  )}`}
                >
                  {activeModalApp.status}
                </span>
                <span className="text-xs font-mono text-[#9DB9D0]/70">
                  ID: {activeModalApp.id}
                </span>
              </div>
              <h2 className="text-2xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.05em]">
                {activeModalApp.fullName}
              </h2>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-heading">
              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email Address
                </span>
                <a
                  href={`mailto:${activeModalApp.email}`}
                  className="text-[#F3EBDD] hover:underline font-mono"
                >
                  {activeModalApp.email}
                </a>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> Phone Number
                </span>
                <a
                  href={`tel:${activeModalApp.phone}`}
                  className="text-[#F3EBDD] hover:underline font-mono"
                >
                  {activeModalApp.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <Building className="w-3 h-3" /> College or Organization
                </span>
                <span className="text-[#F3EBDD]">{activeModalApp.collegeOrOrganization}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Current Status
                </span>
                <span className="text-[#F3EBDD]">
                  {formatStatusType(activeModalApp.currentStatus)}
                </span>
              </div>

              {activeModalApp.courseOrRole && (
                <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                  <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                    <GraduationCap className="w-3 h-3" /> Course or Role
                  </span>
                  <span className="text-[#F3EBDD]">{activeModalApp.courseOrRole}</span>
                </div>
              )}

              {activeModalApp.yearOrSemester && (
                <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                  <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Year or Semester
                  </span>
                  <span className="text-[#F3EBDD]">{activeModalApp.yearOrSemester}</span>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-heading">
                <span className="text-[#F3EBDD] flex items-center gap-1.5 font-medium uppercase tracking-wider text-[11px]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#9DB9D0]" />
                  Internal Evaluation Notes
                </span>
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="text-[#9DB9D0] hover:text-[#F3EBDD] uppercase text-[11px] font-medium tracking-wider cursor-pointer"
                >
                  Save Note
                </button>
              </div>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add private evaluation notes, interview takeaways, squad match suggestions..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071521]/70 border border-[#F3EBDD]/15 text-[#F3EBDD] text-xs font-heading placeholder:text-[#9DB9D0]/50 focus:outline-none focus:border-[#9DB9D0] transition-colors"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-[#F3EBDD]/10 space-y-2">
              <div className="text-[11px] font-heading uppercase text-[#9DB9D0] tracking-wider">
                Update Candidate Status
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REVIEWING")}
                  className="px-3 py-1.5 rounded-md bg-[#6288A6]/20 border border-[#9DB9D0]/40 text-[#F3EBDD] text-xs font-heading uppercase tracking-wider hover:bg-[#6288A6]/30 transition-colors cursor-pointer"
                >
                  Reviewing
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("SHORTLISTED")}
                  className="px-3 py-1.5 rounded-md bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-heading uppercase tracking-wider hover:bg-sky-500/30 transition-colors cursor-pointer"
                >
                  Shortlist
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("ACCEPTED")}
                  className="px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-heading uppercase tracking-wider hover:bg-emerald-500/30 transition-colors cursor-pointer"
                >
                  Accept
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REJECTED")}
                  className="px-3 py-1.5 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-heading uppercase tracking-wider hover:bg-red-500/30 transition-colors cursor-pointer"
                >
                  Reject
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("PENDING")}
                  className="px-3 py-1.5 rounded-md bg-zinc-700/20 border border-zinc-600/40 text-zinc-300 text-xs font-heading uppercase tracking-wider hover:bg-zinc-700/30 transition-colors cursor-pointer"
                >
                  Reset Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
