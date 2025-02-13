import { PrismaClient } from "@prisma/client";
import { initiateSuperAdmin } from "../app/db/db";

const prisma = new PrismaClient();

// Handle connection issues
async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database successfully!");

    // initiate super admin
    initiateSuperAdmin();
  } catch (error) {
    console.error("Prisma connection failed:", error);
    process.exit(1); // Exit process with failure
  }

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Prisma disconnected due to application termination.");
    process.exit(0);
  });
}

connectPrisma();

export default prisma;
