import { PrismaClient, ApplicationStatus, InquiryStatus, ProjectStage, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding THE GROUND database...");

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || "contact.theground@gmail.com";
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
  await prisma.project.create({
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

  await prisma.project.create({
    data: {
      name: "Veritas — Distributed Proof of Contribution",
      description: "Cryptographic consensus protocol recording peer code reviews, deployment logs, and project milestones.",
      problem: "Traditional profiles lack verifiable proof of team contributions, leading to low trust and credential inflation.",
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

  await prisma.project.create({
    data: {
      name: "OpenScribe — Clinical Note Transcription",
      description: "Local-first, private whisper-based dictation tool customized for regional hospital outpatient terminology.",
      problem: "Clinicians spend hours daily on documentation; cloud APIs violate privacy protocols for patient charts.",
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
        fullName: "Arjun Mehta",
        email: "arjun.m@example.edu",
        phone: "+91 98765 43210",
        collegeOrOrganization: "Indian Institute of Technology",
        currentStatus: "Student",
        courseOrRole: "B.Tech Computer Science",
        yearOrSemester: "3rd Year",
        status: ApplicationStatus.REVIEWING,
        adminNotes: "Strong systems background. Recommended for interview with PulseEngine squad.",
      },
      {
        fullName: "Ananya Desai",
        email: "ananya.desai@design.edu",
        phone: "+91 91234 56789",
        collegeOrOrganization: "National Institute of Design",
        currentStatus: "Student",
        courseOrRole: "Product Design",
        yearOrSemester: "4th Year",
        status: ApplicationStatus.SHORTLISTED,
        adminNotes: "Exceptional design and typography sense. Highly recommended for core team.",
      },
      {
        fullName: "Vikram Sengupta",
        email: "vikram.s@univ.edu",
        phone: "+91 99887 76655",
        collegeOrOrganization: "BITS Pilani",
        currentStatus: "Student",
        courseOrRole: "Electrical Engineering",
        yearOrSemester: "2nd Year",
        status: ApplicationStatus.PENDING,
      },
      {
        fullName: "Siddharth Rao",
        email: "siddharth.rao@techcorp.io",
        phone: "+91 98111 22334",
        collegeOrOrganization: "Apex Technologies",
        currentStatus: "Professional",
        courseOrRole: "Senior Systems Engineer",
        yearOrSemester: "Apex Technologies",
        status: ApplicationStatus.SHORTLISTED,
        adminNotes: "Wants to mentor student squads and contribute to distributed systems builds.",
      },
    ],
  });
  console.log("✓ Sample Applications seeded");

  // 4. Seed Sample Client Inquiries
  await prisma.clientInquiry.createMany({
    data: [
      {
        name: "Sarah Jenkins",
        email: "s.jenkins@velocemobility.com",
        phone: "+1 415 555 0192",
        companyOrOrganization: "Veloce Mobility",
        role: "Head of Digital Products",
        problem: "We need an internal fleet diagnostics dashboard that correlates battery degradation with ambient weather telemetry in real-time.",
        desiredOutcome: "Production-ready web dashboard with interactive telemetry curves and anomaly alerts.",
        budget: "₹15,00,000 - ₹25,00,000",
        currency: "INR",
        timeline: "8 - 10 weeks",
        additionalInformation: "API endpoints already exist. We need a capable squad of frontend and systems builders.",
        status: InquiryStatus.CONTACTED,
        adminNotes: "Verified legitimacy. High potential engagement for 4 student builders.",
      },
      {
        name: "Carlos Mendez",
        email: "cmendez@biosynlabs.org",
        phone: "+1 617 555 3381",
        companyOrOrganization: "BioSyn Labs",
        role: "VP of Research Operations",
        problem: "Automating scientific protocol execution logs from PCR thermocyclers into standardized JSON records.",
        desiredOutcome: "Lightweight background parser and audit trail dashboard.",
        budget: "$10,000 - $15,000",
        currency: "USD",
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
      details: "THE GROUND ecosystem platform successfully initialized with official branding parameters.",
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
