import { defineConfig } from "tsup";
import { readFile, writeFile } from "fs/promises";
import { glob } from "tinyglobby";

export default defineConfig({
  // Entry point — barrel file exporting all components
  entry: ["src/components/index.ts"],

  // Dual format: CommonJS for Node/require(), ESM for bundlers/import
  format: ["cjs", "esm"],

  // Use dedicated tsconfig without --incremental
  tsconfig: "tsconfig.build.json",

  // Generate .d.ts declaration files for full TypeScript support
  dts: true,

  // These are peerDependencies — never bundle them
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "framer-motion",
  ],

  // Clean dist/ before each build
  clean: true,

  // Enable tree-shaking
  treeshake: true,

  // Source maps for debugging
  sourcemap: true,

  // Split code for optimal tree-shaking in ESM
  splitting: true,

  // Target modern browsers + Node 18+
  target: "es2020",

  // Inject "use client" directives after build (rollup strips banner directives)
  async onSuccess() {
    const files = await glob("dist/**/*.{js,mjs}", { absolute: true });
    for (const file of files) {
      const content = await readFile(file, "utf-8");
      if (!content.startsWith('"use client"')) {
        await writeFile(file, `"use client";\n${content}`);
      }
    }
    console.log(`✓ Injected "use client" into ${files.length} output files`);
  },
});
