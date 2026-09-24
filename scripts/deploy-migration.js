const { execSync } = require("child_process");

// Check if DATABASE_URL is available
if (process.env.DATABASE_URL) {
  try {
    console.log("Deploying Prisma migrations to database...");
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    console.log("Prisma migrations applied successfully.");
  } catch (err) {
    console.warn("Notice: Prisma migration step skipped or database is not reachable at build time. Runtime will connect directly.");
  }
} else {
  console.log("DATABASE_URL not set during build. Skipping migration step.");
}
