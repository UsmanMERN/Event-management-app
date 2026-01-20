// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // This tells Prisma where to find your schema file
  schema: "prisma/schema.prisma",

  // This datasource block is now the correct place for the URL
  datasource: {
    url: env("DATABASE_URL"),
  },
});