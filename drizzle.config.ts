import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema/*",
  out: "./lib/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  entities: {
    roles: {
      provider: "supabase",
      exclude: ["new_supabase_role"],
    },
  },
  casing: "snake_case",
});
