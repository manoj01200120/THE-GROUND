import { NextResponse } from "next/server";
import { getPublicProjects } from "@/lib/actions/project.actions";

export async function GET() {
  try {
    const projects = await getPublicProjects();
    return NextResponse.json({ projects });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
