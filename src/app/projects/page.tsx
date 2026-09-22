import { getPublicProjects } from "@/lib/actions/project.actions";
import ProjectsView from "@/components/projects/ProjectsView";
import { ProjectData } from "@/types";

export const metadata = {
  title: "Projects — THE GROUND Dashboard",
  description:
    "Explore active, shipped, and emerging projects built by student squads in THE GROUND ecosystem.",
};

export const revalidate = 0; // Fresh on request

export default async function ProjectsPage() {
  const projects = (await getPublicProjects()) as unknown as ProjectData[];

  return (
    <div className="py-28 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[11px] font-mono tracking-widest text-violet-300 uppercase">
          Ecosystem Dashboard
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white font-mono uppercase">
          Active Projects
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Real initiatives with verified code, squad ownership, and transparent progress tracking across every lifecycle stage.
        </p>
      </div>

      <ProjectsView initialProjects={projects} />
    </div>
  );
}
