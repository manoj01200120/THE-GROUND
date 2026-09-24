const EmbeddedPostgres = require("embedded-postgres").default;
const path = require("path");
const fs = require("fs");

async function run() {
  const dbDir = path.join(__dirname, "..", "data", "db");
  const pg = new EmbeddedPostgres({
    databaseDir: dbDir,
    user: "postgres",
    password: "postgres",
    port: 5432,
    persistent: true,
    initdbFlags: ["-E", "UTF8", "--locale=C"],
  });

  const isInitialized = fs.existsSync(path.join(dbDir, "PG_VERSION"));
  if (!isInitialized) {
    console.log("Initialising PostgreSQL UTF-8 data cluster at", dbDir);
    await pg.initialise();
  } else {
    console.log("PostgreSQL data cluster already initialized at", dbDir);
  }

  console.log("Starting PostgreSQL server on port 5432...");
  await pg.start();
  console.log("PostgreSQL started successfully!");

  try {
    await pg.createDatabase("theground");
    console.log("Database 'theground' created successfully!");
  } catch (err) {
    console.log("Database notice:", err.message);
  }

  console.log("PostgreSQL is running and ready on localhost:5432!");

  if (process.argv.includes("--daemon")) {
    console.log("Running in background...");
    setInterval(() => {}, 1000 * 60 * 60);
  }
}

run().catch((err) => {
  console.error("Failed to start embedded PostgreSQL:", err);
  process.exit(1);
});
