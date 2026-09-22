"use client";

import { useState } from "react";
import { ClientInquiryData, InquiryStatus } from "@/types";
import { updateClientInquiryStatus } from "@/lib/actions/client.actions";
import {
  Search,
  Eye,
  X,
  MessageSquare,
  Building,
  DollarSign,
  Clock,
  Briefcase,
} from "lucide-react";

interface Props {
  initialInquiries: ClientInquiryData[];
}

const statuses: (InquiryStatus | "ALL")[] = [
  "ALL",
  "NEW",
  "QUALIFIED",
  "PROPOSAL",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
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
      inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.problem.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (inq: ClientInquiryData) => {
    setActiveModalInq(inq);
    setNotesInput(inq.notes || "");
  };

  const handleStatusChange = async (status: InquiryStatus) => {
    if (!activeModalInq || !activeModalInq.id) return;
    setIsUpdating(true);

    try {
      await updateClientInquiryStatus(activeModalInq.id, status, notesInput);
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === activeModalInq.id ? { ...i, status, notes: notesInput } : i
        )
      );
      setActiveModalInq((prev) => (prev ? { ...prev, status, notes: notesInput } : null));
    } catch (e) {
      console.error(e);
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
          i.id === activeModalInq.id ? { ...i, notes: notesInput } : i
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status?: InquiryStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
      case "IN_PROGRESS":
        return "bg-cyan-500/15 border-cyan-500/40 text-cyan-300";
      case "PROPOSAL":
        return "bg-violet-500/15 border-violet-500/40 text-violet-300";
      case "QUALIFIED":
        return "bg-blue-500/15 border-blue-500/40 text-blue-300";
      case "REJECTED":
        return "bg-red-500/15 border-red-500/40 text-red-400";
      default:
        return "bg-amber-500/15 border-amber-500/40 text-amber-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 glass-panel rounded-xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, problem, contact..."
            className="w-full pl-9 pr-3.5 py-2 rounded bg-black/40 border border-white/10 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? "bg-white text-black font-semibold shadow-glow-subtle"
                  : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Company & Contact</th>
                <th className="py-3 px-4">Problem Scope</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No client inquiries match the current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(inq)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{inq.company}</div>
                      <div className="text-[11px] text-zinc-400">{inq.name} ({inq.role})</div>
                      <div className="text-[10px] text-zinc-500">{inq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="line-clamp-2 text-zinc-300 font-sans text-xs">
                        {inq.problem}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                      {inq.budget}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {inq.timeline}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] uppercase font-semibold ${getStatusBadge(
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
                        className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
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
          <div className="glass-panel rounded-2xl border border-white/20 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalInq(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded border text-[10px] uppercase font-semibold ${getStatusBadge(
                    activeModalInq.status
                  )}`}
                >
                  {activeModalInq.status}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  ID: {activeModalInq.id}
                </span>
              </div>
              <h2 className="text-2xl font-mono uppercase text-white font-semibold">
                {activeModalInq.company}
              </h2>
              <div className="text-xs font-mono text-zinc-400">
                Contact: {activeModalInq.name} ({activeModalInq.role}) • {activeModalInq.email} • {activeModalInq.phone}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Budget Bracket</span>
                <span className="text-emerald-400 font-semibold">{activeModalInq.budget}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Delivery Target</span>
                <span className="text-cyan-400 font-semibold">{activeModalInq.timeline}</span>
              </div>
            </div>

            {/* Deep Content */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Problem Description
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalInq.problem}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Expected Outcome
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalInq.expectedOutcome}</p>
              </div>

              {activeModalInq.additionalInfo && (
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                    Additional Context / Links
                  </span>
                  <p className="text-zinc-300 leading-relaxed">{activeModalInq.additionalInfo}</p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                  Internal Client Notes & Strategy
                </span>
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="text-violet-400 hover:text-violet-300 uppercase text-[11px]"
                >
                  Save Note
                </button>
              </div>
              <textarea
                rows={2}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Log call summary, client sentiment, or squad assignment ideas..."
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono uppercase text-zinc-500">
                Update Client Pipeline Stage
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("QUALIFIED")}
                  className="px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase hover:bg-blue-500/20 transition-colors"
                >
                  Qualify Lead
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("PROPOSAL")}
                  className="px-3 py-1.5 rounded bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase hover:bg-violet-500/20 transition-colors"
                >
                  Send Proposal
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("IN_PROGRESS")}
                  className="px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase hover:bg-cyan-500/20 transition-colors"
                >
                  Active Build
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("COMPLETED")}
                  className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase hover:bg-emerald-500/20 transition-colors"
                >
                  Completed & Shipped
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REJECTED")}
                  className="px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase hover:bg-red-500/20 transition-colors"
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
