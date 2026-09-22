"use client";

import { useState } from "react";
import { ProjectData, ProjectStage, ProjectStatus } from "@/types";
import { createProject, updateProjectStage } from "@/lib/actions/project.actions";
import {
  Plus,
  Layers,
  Edit2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Users,
} from "lucide-react";

interface Props {
  initialProjects: ProjectData[];
}

const stages: ProjectStage[] = [
  "DISCOVERY",
  "DECISION",
  "TEAM",
  "BUILD",
  "VALIDATE",
  "SHIP",
  "MAINTAIN",
  "LEARN",
];

export default function AdminProjectsManager({ initialProjects }: Props) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalProject, setEditModalProject] = useState<ProjectData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // New Project Form State
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newProblem, setNewProblem] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newStage, setNewStage] = useState<ProjectStage>("DISCOVERY");
  const [newClient, setNewClient] = useState("");
  const [newMembers, setNewMembers] = useState<{ name: string; role: string; email: string }[]>([
    { name: "", role: "Lead Engineer", email: "" },
  ]);

  // Edit Project State
  const [editStage, setEditStage] = useState<ProjectStage>("BUILD");
  const [editProgress, setEditProgress] = useState<number>(0);
  const [editBlockers, setEditBlockers] = useState<string>("");
  const [editOutcome, setEditOutcome] = useState<string>("");

  const handleOpenEdit = (p: ProjectData) => {
    setEditModalProject(p);
    setEditStage(p.stage);
    setEditProgress(p.progress);
    setEditBlockers(p.blockers || "");
    setEditOutcome(p.outcome || "");
  };

  const handleSaveEdit = async () => {
    if (!editModalProject) return;
    setIsSubmitting(true);

    try {
      await updateProjectStage(editModalProject.id, {
        stage: editStage,
        progress: Number(editProgress),
        blockers: editBlockers || undefined,
        outcome: editOutcome || undefined,
      });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === editModalProject.id
            ? {
                ...p,
                stage: editStage,
                progress: Number(editProgress),
                blockers: editBlockers || null,
                outcome: editOutcome || null,
              }
            : p
        )
      );
      setEditModalProject(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validMembers = newMembers.filter((m) => m.name.trim() !== "");
      const res = await createProject({
        name: newName,
        description: newDesc,
        problem: newProblem,
        owner: newOwner,
        stage: newStage,
        status: "ACTIVE",
        progress: 10,
        client: newClient || undefined,
        members: validMembers,
      });

      if (res.success && res.project) {
        setProjects((prev) => [
          {
            ...res.project,
            createdAt: res.project.createdAt.toISOString(),
            updatedAt: res.project.updatedAt.toISOString(),
            deadline: res.project.deadline ? res.project.deadline.toISOString() : null,
            members: validMembers,
          } as unknown as ProjectData,
          ...prev,
        ]);
        setCreateModalOpen(false);
        // Reset form
        setNewName("");
        setNewDesc("");
        setNewProblem("");
        setNewOwner("");
        setNewClient("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-zinc-400">
          Managing {projects.length} Active Ecosystem Projects
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white text-black font-mono font-medium text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-glow-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="glass-panel rounded-xl p-5 md:p-6 border border-white/10 hover:border-white/20 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-mono uppercase text-white font-semibold">
                    {p.name}
                  </h3>
                  {p.client && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30">
                      Client: {p.client}
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Owner: <span className="text-zinc-200">{p.owner}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-mono uppercase font-semibold">
                  {p.stage}
                </span>
                <span className="text-xs font-mono text-zinc-400">{p.progress}%</span>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Problem</span>
                <span className="text-zinc-300 line-clamp-2">{p.problem}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Blocker Status</span>
                {p.blockers ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {p.blockers}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> No active blockers
                  </span>
                )}
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block">Outcome</span>
                <span className="text-zinc-300 line-clamp-2">{p.outcome || "Pending milestone"}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel rounded-2xl border border-white/20 p-6 md:p-8 max-w-lg w-full space-y-5 relative shadow-2xl">
            <button
              onClick={() => setEditModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-mono uppercase text-white font-semibold">
              Update Project Lifecycle
            </h2>
            <div className="text-xs font-mono text-zinc-400">{editModalProject.name}</div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-300 block">Lifecycle Stage</label>
                <select
                  value={editStage}
                  onChange={(e) => setEditStage(e.target.value as ProjectStage)}
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                >
                  {stages.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-zinc-300">Progress: {editProgress}%</label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={editProgress}
                  onChange={(e) => setEditProgress(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 block">Blockers (leave blank if none)</label>
                <input
                  type="text"
                  value={editBlockers}
                  onChange={(e) => setEditBlockers(e.target.value)}
                  placeholder="e.g. Memory leak on 512MB RAM node"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 block">Target Outcome / Deliverable</label>
                <textarea
                  rows={2}
                  value={editOutcome}
                  onChange={(e) => setEditOutcome(e.target.value)}
                  placeholder="Target outcome or deliverable details"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalProject(null)}
                  className="px-4 py-2 rounded border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel rounded-2xl border border-white/20 p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-5 relative shadow-2xl">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-mono uppercase text-white font-semibold">
              Create New Project
            </h2>

            <form onSubmit={handleCreateSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-300 block">Project Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Chronos — Distributed Vector Clock"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 block">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summary of what the project accomplishes"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 block">Problem Framing *</label>
                <textarea
                  rows={2}
                  required
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="The root problem being solved"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 block">Project Owner (Lead) *</label>
                  <input
                    type="text"
                    required
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="Student Lead Name"
                    className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 block">Initial Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ProjectStage)}
                    className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 block">Client / Partner (Optional)</label>
                <input
                  type="text"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="e.g. AeroDynamics Lab"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Members */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-300 block">Initial Squad Members</label>
                  <button
                    type="button"
                    onClick={() =>
                      setNewMembers([...newMembers, { name: "", role: "Engineer", email: "" }])
                    }
                    className="text-violet-400 hover:text-violet-300 uppercase text-[10px]"
                  >
                    + Add Member
                  </button>
                </div>
                {newMembers.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={m.name}
                      onChange={(e) => {
                        const updated = [...newMembers];
                        updated[idx].name = e.target.value;
                        setNewMembers(updated);
                      }}
                      className="px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-white text-[11px]"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={m.role}
                      onChange={(e) => {
                        const updated = [...newMembers];
                        updated[idx].role = e.target.value;
                        setNewMembers(updated);
                      }}
                      className="px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-white text-[11px]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={m.email}
                      onChange={(e) => {
                        const updated = [...newMembers];
                        updated[idx].email = e.target.value;
                        setNewMembers(updated);
                      }}
                      className="px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-white text-[11px]"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-white text-black font-semibold hover:bg-zinc-200"
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
