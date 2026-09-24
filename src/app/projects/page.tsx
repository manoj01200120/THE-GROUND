import { getPublicProjects } from "@/lib/actions/project.actions";
import ProjectsView from "@/components/projects/ProjectsView";
import { ProjectData } from "@/types";

export const metadata = {
  title: "Projects — THE GROUND Ecosystem",
  description:
    "Explore active, shipped, and emerging projects built by student squads in THE GROUND ecosystem.",
};

export const revalidate = 0; // Fresh on request

export default async function ProjectsPage() {
  const projects = (await getPublicProjects()) as unknown as ProjectData[];

  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0B1C2D]/20 bg-[#0B1C2D]/10 text-[11px] font-mono tracking-widest text-[#0B1C2D] uppercase">
          Ecosystem Dashboard
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-[0.2em] text-[#0B1C2D]">
          Active Projects
        </h1>
        <p className="text-[#071521]/80 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
          Real initiatives with squad ownership, verified code, and transparent progress tracking across every lifecycle stage.
        </p>
      </div>

      <ProjectsView initialProjects={projects} />
    </div>
  );
}
