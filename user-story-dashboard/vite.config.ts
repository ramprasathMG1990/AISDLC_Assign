import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins:[react()], server:{port:3000}, build:{outDir:"dist"}, test:{environment:"jsdom",setupFiles:"./tests/setup.ts",include:["tests/unit/**/*.test.tsx"]} });
