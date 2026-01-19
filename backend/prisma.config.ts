// This file can be in the root of your project or in the prisma folder.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The 'env' function is the recommended way to access environment variables here.
    url: env("DATABASE_URL"),
  },
});