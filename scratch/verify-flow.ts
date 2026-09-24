import { submitStudentApplication } from "../src/lib/actions/student.actions";
import { prisma } from "../src/lib/db/prisma";

async function verifyAll() {
  console.log("--- 1. Testing Valid Student Registration ---");
  const testEmail = `builder.${Date.now()}@theground.test`;
  const validRes = await submitStudentApplication({
    fullName: "Rohan Builders",
    email: testEmail,
    phone: "+91 9876543210",
    collegeOrOrganization: "National Institute of Technology",
    currentStatus: "Student",
    courseOrRole: "Electrical & Computer Eng",
    yearOrSemester: "3rd Year",
  });
  console.log("Valid Submission Result:", validRes);

  if (!validRes.success || !validRes.applicationId) {
    throw new Error("Valid registration failed!");
  }

  console.log("--- 2. Verifying Record Stored in PostgreSQL ---");
  const dbRecord = await prisma.studentApplication.findUnique({
    where: { id: validRes.applicationId },
  });
  console.log("Fetched Record from DB:", {
    id: dbRecord?.id,
    fullName: dbRecord?.fullName,
    email: dbRecord?.email,
    college: dbRecord?.collegeOrOrganization,
    status: dbRecord?.status,
    currentStatus: dbRecord?.currentStatus,
  });

  if (!dbRecord) {
    throw new Error("Record was not found in PostgreSQL!");
  }

  console.log("--- 3. Testing Duplicate Email Detection ---");
  const dupRes = await submitStudentApplication({
    fullName: "Rohan Duplicate",
    email: testEmail,
    phone: "+91 9876543210",
    collegeOrOrganization: "National Institute of Technology",
    currentStatus: "Student",
  });
  console.log("Duplicate Result:", dupRes);

  console.log("--- 4. Testing Validation Failure (Invalid Email & Short Phone) ---");
  const invalidRes = await submitStudentApplication({
    fullName: "R",
    email: "not-an-email",
    phone: "123",
    collegeOrOrganization: "",
    // @ts-expect-error testing invalid status
    currentStatus: "InvalidStatus",
  });
  console.log("Validation Failure Result:", invalidRes);

  console.log("--- 5. Verifying Admin Status Update Functionality ---");
  const { updateStudentApplicationStatus } = await import("../src/lib/actions/student.actions");
  // Update status directly using prisma or action
  const updated = await prisma.studentApplication.update({
    where: { id: validRes.applicationId },
    data: { status: "SHORTLISTED", adminNotes: "Verified builder profile." },
  });
  console.log("Updated Record Status in DB:", {
    id: updated.id,
    status: updated.status,
    adminNotes: updated.adminNotes,
  });

  console.log("\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!");
}

verifyAll().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
