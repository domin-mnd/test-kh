import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/index.ts", "src/routes"],
  clean: true,
  format: ["cjs"],
  ...options,
}));
