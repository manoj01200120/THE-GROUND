import { submitStudentApplication } from "../src/lib/actions/student.actions";

async function test() {
  console.log("Testing submitStudentApplication with valid student data...");
  const result = await submitStudentApplication({
    fullName: "Aarav Sharma",
    email: "aarav.test." + Date.now() + "@example.com",
    phone: "+91 9876543210",
    collegeOrOrganization: "Indian Institute of Technology",
    currentStatus: "Student",
    courseOrRole: "Computer Science",
    yearOrSemester: "3rd Year",
  });

  console.log("Result:", result);
}

test().catch(console.error);
