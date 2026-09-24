"use client";

import { useState } from "react";
import { ClientInquiryData, InquiryStatus } from "@/types";
import { updateClientInquiryStatus } from "@/lib/actions/client.actions";
import {
  Search,
  Eye,
  X,
  MessageSquare,
  Building2,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  User,
  Briefcase,
} from "lucide-react";

interface Props {
  initialInquiries: ClientInquiryData[];
}

const statuses: (InquiryStatus | "ALL")[] = [
  "ALL",
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "IN_DISCUSSION",
  "ACCEPTED",
  "REJECTED",
  "COMPLETED",
];

export default function ClientInquiriesManager({ initialInquiries }: Props) {
  const [inquiries, setInquiries] = useState<ClientInquiryData[]>(initialInquiries);
  const [selectedStatus, setSelectedStatus] = useState<InquiryStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeModalInq, setActiveModalInq] = useState<ClientInquiryData | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [notesInput, setNotesInput] = useState<string>("");

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = selectedStatus === "ALL" || inq.status === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.companyOrOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.problem.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (inq: ClientInquiryData) => {
    setActiveModalInq(inq);
    setNotesInput(inq.adminNotes || "");
  };

  const handleStatusChange = async (status: InquiryStatus) => {
    if (!activeModalInq || !activeModalInq.id) return;
    setIsUpdating(true);

    try {
      await updateClientInquiryStatus(activeModalInq.id, status, notesInput);
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === activeModalInq.id ? { ...i, status, adminNotes: notesInput } : i
        )
      );
      setActiveModalInq((prev) => (prev ? { ...prev, status, adminNotes: notesInput } : null));
    } catch (e) {
      console.error("Failed to update inquiry status:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeModalInq || !activeModalInq.id) return;
    setIsUpdating(true);

    try {
      await updateClientInquiryStatus(activeModalInq.id, activeModalInq.status || "NEW", notesInput);
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === activeModalInq.id ? { ...i, adminNotes: notesInput } : i
        )
      );
    } catch (e) {
      console.error("Failed to save client notes:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status?: InquiryStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300";
      case "ACCEPTED":
        return "bg-teal-500/20 border-teal-500/40 text-teal-300";
      case "IN_DISCUSSION":
        return "bg-sky-500/20 border-sky-500/40 text-sky-300";
      case "CONTACTED":
        return "bg-[#6288A6]/30 border-[#9DB9D0]/40 text-[#F3EBDD]";
      case "REVIEWING":
        return "bg-indigo-500/20 border-indigo-500/40 text-indigo-300";
      case "REJECTED":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      default:
        return "bg-amber-500/20 border-amber-500/40 text-amber-300";
    }
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
            placeholder="Search company, contact, problem..."
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

      {/* Inquiries Table */}
      <div className="ground-card-dark rounded-xl border border-[#F3EBDD]/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-heading text-xs">
            <thead className="border-b border-[#F3EBDD]/10 bg-[#071521]/60 text-[#9DB9D0] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Organization & Contact</th>
                <th className="py-3 px-4">Problem Statement</th>
                <th className="py-3 px-4">Budget Range</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDD]/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#9DB9D0]/60">
                    No client inquiries match the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-[#19334B]/30 transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(inq)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#F3EBDD]">{inq.companyOrOrganization}</div>
                      <div className="text-[11px] text-[#9DB9D0]">{inq.name} {inq.role ? `(${inq.role})` : ""}</div>
                      <div className="text-[10px] text-[#9DB9D0]/70 font-mono">{inq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="line-clamp-2 text-[#F3EBDD]/90 text-xs">
                        {inq.problem}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-emerald-300">
                      {inq.currency === "USD" ? "$" : "₹"} {inq.budget}
                    </td>
                    <td className="py-3.5 px-4 text-[#9DB9D0]">
                      {inq.timeline}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] uppercase font-medium tracking-wider ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(inq);
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

      {/* Inquiry Detail Modal */}
      {activeModalInq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="ground-card-dark rounded-2xl border border-[#F3EBDD]/20 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalInq(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#071521]/60 text-[#9DB9D0] hover:text-[#F3EBDD] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-medium tracking-wider ${getStatusBadge(
                    activeModalInq.status
                  )}`}
                >
                  {activeModalInq.status}
                </span>
                <span className="text-xs font-mono text-[#9DB9D0]/70">
                  ID: {activeModalInq.id}
                </span>
              </div>
              <h2 className="text-2xl font-heading uppercase text-[#F3EBDD] font-medium tracking-[0.05em]">
                {activeModalInq.companyOrOrganization}
              </h2>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-heading">
              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Contact Representative
                </span>
                <span className="text-[#F3EBDD] font-medium">
                  {activeModalInq.name} {activeModalInq.role ? `(${activeModalInq.role})` : ""}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email Address
                </span>
                <a
                  href={`mailto:${activeModalInq.email}`}
                  className="text-[#F3EBDD] hover:underline font-mono"
                >
                  {activeModalInq.email}
                </a>
              </div>

              {activeModalInq.phone && (
                <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                  <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> Phone Number
                  </span>
                  <a
                    href={`tel:${activeModalInq.phone}`}
                    className="text-[#F3EBDD] hover:underline font-mono"
                  >
                    {activeModalInq.phone}
                  </a>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3" /> Budget Allocated
                </span>
                <span className="text-emerald-300 font-mono font-medium">
                  {activeModalInq.currency} {activeModalInq.budget}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1 sm:col-span-2">
                <span className="text-[#9DB9D0] text-[10px] uppercase tracking-wider block flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Expected Timeline
                </span>
                <span className="text-[#F3EBDD]">{activeModalInq.timeline}</span>
              </div>
            </div>

            {/* Problem & Outcome Details */}
            <div className="space-y-4 text-xs font-heading">
              <div className="p-4 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1.5">
                <span className="text-[10px] font-heading uppercase text-[#9DB9D0] tracking-wider block">
                  Problem Description
                </span>
                <p className="text-[#F3EBDD]/90 leading-relaxed whitespace-pre-wrap">
                  {activeModalInq.problem}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1.5">
                <span className="text-[10px] font-heading uppercase text-[#9DB9D0] tracking-wider block">
                  Desired Outcome
                </span>
                <p className="text-[#F3EBDD]/90 leading-relaxed whitespace-pre-wrap">
                  {activeModalInq.desiredOutcome}
                </p>
              </div>

              {activeModalInq.additionalInformation && (
                <div className="p-4 rounded-lg bg-[#071521]/60 border border-[#F3EBDD]/10 space-y-1.5">
                  <span className="text-[10px] font-heading uppercase text-[#9DB9D0] tracking-wider block">
                    Additional Context & Links
                  </span>
                  <p className="text-[#F3EBDD]/90 leading-relaxed whitespace-pre-wrap">
                    {activeModalInq.additionalInformation}
                  </p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-heading">
                <span className="text-[#F3EBDD] flex items-center gap-1.5 font-medium uppercase tracking-wider text-[11px]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#9DB9D0]" />
                  Internal Evaluation & Client Strategy
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
                placeholder="Log call notes, problem viability analysis, squad assignment recommendations..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071521]/70 border border-[#F3EBDD]/15 text-[#F3EBDD] text-xs font-heading placeholder:text-[#9DB9D0]/50 focus:outline-none focus:border-[#9DB9D0] transition-colors"
              />
            </div>

            {/* Pipeline Stage Buttons */}
            <div className="pt-4 border-t border-[#F3EBDD]/10 space-y-2">
              <div className="text-[11px] font-heading uppercase text-[#9DB9D0] tracking-wider">
                Advance Pipeline Stage
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
                  onClick={() => handleStatusChange("CONTACTED")}
                  className="px-3 py-1.5 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-heading uppercase tracking-wider hover:bg-blue-500/30 transition-colors cursor-pointer"
                >
                  Contacted
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("IN_DISCUSSION")}
                  className="px-3 py-1.5 rounded-md bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-heading uppercase tracking-wider hover:bg-sky-500/30 transition-colors cursor-pointer"
                >
                  In Discussion
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("ACCEPTED")}
                  className="px-3 py-1.5 rounded-md bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-heading uppercase tracking-wider hover:bg-teal-500/30 transition-colors cursor-pointer"
                >
                  Accept Project
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("COMPLETED")}
                  className="px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-heading uppercase tracking-wider hover:bg-emerald-500/30 transition-colors cursor-pointer"
                >
                  Completed
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REJECTED")}
                  className="px-3 py-1.5 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-heading uppercase tracking-wider hover:bg-red-500/30 transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
