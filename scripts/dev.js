const { spawn } = require("child_process");
const net = require("net");
const path = require("path");
const fs = require("fs");

function isPortOpen(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function main() {
  const dbUrl = process.env.DATABASE_URL || "";
  const isLocalDb = dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1") || !dbUrl;

  let pgInstance = null;

  if (isLocalDb) {
    const isOpen = await isPortOpen(5432);
    if (!isOpen) {
      console.log("\n=======================================================");
      console.log("  THE GROUND — Starting Local PostgreSQL Service...   ");
      console.log("=======================================================\n");

      try {
        const EmbeddedPostgres = require("embedded-postgres").default;
        const dbDir = path.join(__dirname, "..", "data", "db");
        pgInstance = new EmbeddedPostgres({
          databaseDir: dbDir,
          user: "postgres",
          password: "postgres",
          port: 5432,
          persistent: true,
          initdbFlags: ["-E", "UTF8", "--locale=C"],
        });

        const isInitialized = fs.existsSync(path.join(dbDir, "PG_VERSION"));
        if (!isInitialized) {
          console.log("[PostgreSQL] Initialising local data cluster...");
          await pgInstance.initialise();
        }

        console.log("[PostgreSQL] Launching server on port 5432...");
        await pgInstance.start();
        console.log("[PostgreSQL] Local database engine ready on port 5432!\n");

        try {
          await pgInstance.createDatabase("theground");
        } catch {
          // ignore if already exists
        }
      } catch (err) {
        console.warn("[PostgreSQL Warning] Could not start embedded postgres:", err.message);
      }
    } else {
      console.log("[PostgreSQL] Active database detected on port 5432. Connected.");
    }
  }

  // Start Next.js development server
  console.log("[Next.js] Starting THE GROUND development server...\n");

  const isWindows = process.platform === "win32";
  const nextCmd = isWindows ? "npx.cmd" : "npx";
  const child = spawn(nextCmd, ["next", "dev"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env },
  });

  const cleanup = async () => {
    if (pgInstance) {
      try {
        console.log("\n[PostgreSQL] Stopping local database server...");
        await pgInstance.stop();
      } catch {}
    }
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  child.on("exit", (code) => {
    cleanup();
  });
}

main().catch((err) => {
  console.error("Failed to start development environment:", err);
  process.exit(1);
});
