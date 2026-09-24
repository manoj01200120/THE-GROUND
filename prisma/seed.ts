import { PrismaClient, ProjectStage, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding THE GROUND database...");

  // Admin
  const adminEmail =
    process.env.ADMIN_EMAIL || "contact.theground@gmail.com";
  const adminPassword =
    process.env.ADMIN_PASSWORD || "ground_admin_secure_2026!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Ground Ecosystem Lead",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✓ Admin initialized");
  // Remove old project data
  await prisma.project.deleteMany();
  console.log("✓ Old projects removed");

  // Project 1
  await prisma.project.create({
    data: {
      name: "AI Incident Root Cause Investigator (LLM + RAG)",

      description:
        "Technologies: Python, FastAPI, PostgreSQL, ChromaDB, LangChain, Ollama, Pandas. Designed and developed an AI-powered system to analyze operational logs and identify potential root causes of incidents using Retrieval-Augmented Generation (RAG). Built an intelligent workflow that retrieves relevant contextual information to generate accurate and explainable incident insights for faster troubleshooting. Automated log analysis and root cause investigation, improving incident response efficiency and reducing manual analysis effort.",

      problem:
        "AI-powered analysis of operational logs and incident root causes.",

      owner: "Manoj",

      stage: ProjectStage.LEARN,
      status: ProjectStatus.ACTIVE,
      progress: 100,

      outcome: "Completed project",

      members: {
        create: [
          {
            name: "Manoj",
            role: "Team Member",
            email: "",
          },
          {
            name: "Bala Subramanya",
            role: "Team Member",
            email: "",
          },
          {
            name: "Shivaprasad",
            role: "Team Member",
            email: "",
          },
        ],
      },
    },
  });

  // Project 2
  await prisma.project.create({
    data: {
      name: "De-Ageing Using Machine Learning",

      description:
        "Technologies: Python, OpenCV, Machine Learning. Developed a facial age transformation application capable of estimating and generating age-regressed human face images. Implemented image preprocessing and feature extraction techniques to improve prediction quality and enhance model performance. Demonstrated potential applications in digital forensics, medical visualization, and the entertainment industry through AI-driven image analysis.",

      problem:
        "Facial age transformation using machine learning.",

      owner: "Bala Subramanya",

      stage: ProjectStage.LEARN,
      status: ProjectStatus.ACTIVE,
      progress: 100,

      outcome: "Completed project",

      members: {
        create: [
          {
            name: "Bala Subramanya",
            role: "Team Member",
            email: "",
          },
          {
            name: "Chetan AG",
            role: "Team Member",
            email: "",
          },
          {
            name: "Harsha MS",
            role: "Team Member",
            email: "",
          },
        ],
      },
    },
  });

  console.log("✓ Real projects added");
  console.log("✓ Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });