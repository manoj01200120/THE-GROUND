"use client";

import { useState } from "react";
import { StudentApplicationData, ApplicationStatus } from "@/types";
import { updateStudentApplicationStatus } from "@/lib/actions/student.actions";
import {
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  User,
  Loader2,
  X,
  MessageSquare,
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
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (app: StudentApplicationData) => {
    setActiveModalApp(app);
    setNotesInput(app.notes || "");
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!activeModalApp || !activeModalApp.id) return;
    setIsUpdating(true);

    try {
      await updateStudentApplicationStatus(activeModalApp.id, status, notesInput);
      setApplications((prev) =>
        prev.map((a) =>
          a.id === activeModalApp.id ? { ...a, status, notes: notesInput } : a
        )
      );
      setActiveModalApp((prev) => (prev ? { ...prev, status, notes: notesInput } : null));
    } catch (e) {
      console.error(e);
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
          a.id === activeModalApp.id ? { ...a, notes: notesInput } : a
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status?: ApplicationStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
      case "SHORTLISTED":
        return "bg-cyan-500/15 border-cyan-500/40 text-cyan-300";
      case "REVIEWING":
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
            placeholder="Search applicants, college, email..."
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

      {/* Applications Table */}
      <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">College & Year</th>
                <th className="py-3 px-4">Primary Skills</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No applications match the current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(app)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{app.name}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-zinc-300">{app.college}</div>
                      <div className="text-[11px] text-zinc-500">{app.course} ({app.year})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {app.skills?.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {app.availability}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] uppercase font-semibold ${getStatusBadge(
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

      {/* Application Detail Modal / Drawer */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel rounded-2xl border border-white/20 p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalApp(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded border text-[10px] uppercase font-semibold ${getStatusBadge(
                    activeModalApp.status
                  )}`}
                >
                  {activeModalApp.status}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  ID: {activeModalApp.id}
                </span>
              </div>
              <h2 className="text-2xl font-mono uppercase text-white font-semibold">
                {activeModalApp.name}
              </h2>
              <div className="text-xs font-mono text-zinc-400">
                {activeModalApp.email} • {activeModalApp.phone} • {activeModalApp.city}
              </div>
              <div className="text-xs font-mono text-zinc-500">
                {activeModalApp.college} — {activeModalApp.course} ({activeModalApp.year})
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeModalApp.github && (
                <a
                  href={activeModalApp.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
              {activeModalApp.portfolio && (
                <a
                  href={activeModalApp.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
              {activeModalApp.linkedin && (
                <a
                  href={activeModalApp.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
              {activeModalApp.resumeUrl && (
                <a
                  href={activeModalApp.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-violet-500/10 border border-violet-500/30 hover:border-violet-500/50 text-xs font-mono text-violet-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Resume / CV</span>
                  <ExternalLink className="w-3 h-3 text-violet-400" />
                </a>
              )}
            </div>

            {/* Deep Answers */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Built Before
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalApp.projects}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Interests & Seeking to Build
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalApp.interests}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Learning Goals
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalApp.learningGoals}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Experience & Alignment
                </span>
                <p className="text-zinc-300 leading-relaxed">{activeModalApp.experience}</p>
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                  Internal Evaluation Notes
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
                placeholder="Add private feedback, team match suggestions, or interview notes..."
                className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono uppercase text-zinc-500">
                Update Candidate Status
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REVIEWING")}
                  className="px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase hover:bg-blue-500/20 transition-colors"
                >
                  Mark Reviewing
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("SHORTLISTED")}
                  className="px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase hover:bg-cyan-500/20 transition-colors"
                >
                  Shortlist
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("ACCEPTED")}
                  className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase hover:bg-emerald-500/20 transition-colors"
                >
                  Accept Candidate
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("REJECTED")}
                  className="px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase hover:bg-red-500/20 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
