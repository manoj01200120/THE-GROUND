import { PrismaClient, ApplicationStatus, InquiryStatus, ProjectStage, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding THE GROUND database...");

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || "admin@theground.build";
  const adminPassword = process.env.ADMIN_PASSWORD || "ground_admin_secure_2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Ground Ecosystem Lead",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin initialized: ${admin.email}`);

  // 2. Seed Sample Projects
  const projectA = await prisma.project.create({
    data: {
      name: "PulseEngine — Autonomous Telemetry Pipeline",
      description: "High-throughput edge sensor aggregation pipeline built with Rust and WebSockets for hardware telemetry.",
      problem: "Hardware prototypes generate bursty telemetry that overwhelms traditional cloud ingestion without local queuing.",
      owner: "Aarav Sharma",
      stage: ProjectStage.BUILD,
      status: ProjectStatus.ACTIVE,
      progress: 68,
      client: "AeroDynamics Lab",
      blockers: "Resolving memory compaction on 512MB RAM edge nodes",
      outcome: "Targeting 50k events/sec sustained ingestion rate",
      members: {
        create: [
          { name: "Aarav Sharma", role: "Systems Lead", email: "aarav@theground.build" },
          { name: "Priya Nair", role: "Rust Engineer", email: "priya@theground.build" },
          { name: "David Chen", role: "Hardware QA", email: "david@theground.build" },
        ],
      },
    },
  });

  const projectB = await prisma.project.create({
    data: {
      name: "Veritas — Distributed Proof of Contribution",
      description: "Cryptographic consensus protocol recording peer code reviews, deployment logs, and student project milestones.",
      problem: "Resumes lack verifiable proof of team contributions, leading to inflated credentials and low hiring confidence.",
      owner: "Maya Lin",
      stage: ProjectStage.SHIP,
      status: ProjectStatus.ACTIVE,
      progress: 92,
      outcome: "Shipped v1.0 beta tested with 120 student repositories",
      members: {
        create: [
          { name: "Maya Lin", role: "Core Protocol Lead", email: "maya@theground.build" },
          { name: "Kavya Patel", role: "Frontend Architect", email: "kavya@theground.build" },
        ],
      },
    },
  });

  const projectC = await prisma.project.create({
    data: {
      name: "OpenScribe — Clinical Note Transcription",
      description: "Local-first, private whisper-based dictation tool customized for regional hospital outpatient terminology.",
      problem: "Doctors spend 3+ hours daily on documentation; cloud APIs violate privacy protocols for patient charts.",
      owner: "Rohan Varma",
      stage: ProjectStage.DISCOVERY,
      status: ProjectStatus.PLANNING,
      progress: 25,
      client: "St. Jude Community Clinic",
      blockers: "Collecting regional accent training dataset for medical jargon",
      outcome: "Expected 60% reduction in clinician documentation hours",
      members: {
        create: [
          { name: "Rohan Varma", role: "ML Engineer", email: "rohan@theground.build" },
          { name: "Sneha Reddy", role: "Clinical Researcher", email: "sneha@theground.build" },
        ],
      },
    },
  });

  console.log("✓ Projects seeded");

  // 3. Seed Sample Student Applications
  await prisma.studentApplication.createMany({
    data: [
      {
        name: "Arjun Mehta",
        email: "arjun.m@example.edu",
        phone: "+91 98765 43210",
        college: "Indian Institute of Technology",
        course: "Computer Science & Engineering",
        year: "3rd Year",
        city: "Bengaluru",
        skills: JSON.stringify(["Full-Stack", "Rust", "Distributed Systems", "TypeScript"]),
        interests: "High-concurrency distributed engines and real-time collaborative software.",
        experience: "Built a distributed raft-consensus key-value store and interned at a fintech startup.",
        projects: "Distributed KV-store in Go; terminal-based markdown live previewer.",
        learningGoals: "Mastering zero-copy networking, asynchronous I/O, and production systems design.",
        availability: "20 hours / week",
        portfolio: "https://arjunm.dev",
        github: "https://github.com/arjunm-dev",
        linkedin: "https://linkedin.com/in/arjun-mehta",
        status: ApplicationStatus.REVIEWING,
        notes: "Strong systems background. Recommended for interview with PulseEngine team.",
      },
      {
        name: "Ananya Desai",
        email: "ananya.desai@design.edu",
        phone: "+91 91234 56789",
        college: "National Institute of Design",
        course: "Interaction & Product Design",
        year: "4th Year",
        city: "Ahmedabad",
        skills: JSON.stringify(["Product Design", "UI/UX", "Figma", "Design Systems", "Prototyping"]),
        interests: "Clean editorial interfaces, complex technical tools, spatial audio UX.",
        experience: "Designed developer tooling UI for open source projects; 2 design awards.",
        projects: "Complete design system for multi-tenant analytics dashboard in Figma.",
        learningGoals: "Working directly with systems engineers to ship pixel-perfect production code.",
        availability: "15 hours / week",
        portfolio: "https://ananya.design",
        github: "https://github.com/ananyadesign",
        linkedin: "https://linkedin.com/in/ananyadesai",
        status: ApplicationStatus.SHORTLISTED,
        notes: "Exceptional typography and layout sense. Portfolio is pristine.",
      },
      {
        name: "Vikram Sengupta",
        email: "vikram.s@univ.edu",
        phone: "+91 99887 76655",
        college: "BITS Pilani",
        course: "Electrical & Electronics",
        year: "2nd Year",
        city: "Hyderabad",
        skills: JSON.stringify(["Embedded C", "Firmware", "Robotics", "Python"]),
        interests: "Autonomous drones, ROS2, edge AI acceleration.",
        experience: "Led university robotics team for University Rover Challenge.",
        projects: "Obstacle avoidance rover using OpenCV and STM32 microcontroller.",
        learningGoals: "Deepen understanding of embedded Linux and real-time operating systems.",
        availability: "25 hours / week",
        github: "https://github.com/vikramsengupta",
        status: ApplicationStatus.PENDING,
      },
    ],
  });
  console.log("✓ Sample Student Applications seeded");

  // 4. Seed Sample Client Inquiries
  await prisma.clientInquiry.createMany({
    data: [
      {
        name: "Sarah Jenkins",
        company: "Veloce Mobility",
        email: "s.jenkins@velocemobility.com",
        phone: "+1 415 555 0192",
        role: "Head of Digital Products",
        problem: "We need an internal fleet diagnostics dashboard that correlates vehicle battery degradation with ambient weather telemetry in real-time.",
        expectedOutcome: "Production-ready web dashboard with interactive map, degradation curve charts, and anomaly alerts.",
        budget: "$15,000 - $25,000",
        timeline: "8 - 10 weeks",
        additionalInfo: "API endpoints already exist. We need a capable team of frontend and systems builders.",
        status: InquiryStatus.QUALIFIED,
        notes: "Verified legitimacy. High potential for 4 student builders.",
      },
      {
        name: "Carlos Mendez",
        company: "BioSyn Labs",
        email: "cmendez@biosynlabs.org",
        phone: "+1 617 555 3381",
        role: "VP of Research Operations",
        problem: "Automating scientific protocol execution logs from PCR thermocyclers into standardized FHIR-compliant JSON records.",
        expectedOutcome: "Lightweight background parser and audit trail tool.",
        budget: "$10,000 - $15,000",
        timeline: "4 - 6 weeks",
        status: InquiryStatus.NEW,
      },
    ],
  });
  console.log("✓ Sample Client Inquiries seeded");

  // 5. Activity Log
  await prisma.activityLog.create({
    data: {
      action: "SYSTEM_INITIALIZE",
      details: "THE GROUND ecosystem platform successfully seeded with initial parameters.",
      adminEmail: adminEmail,
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
