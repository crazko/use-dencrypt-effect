/// <reference types="vitest" />

import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import packageJson from "./package.json";

export default defineConfig({
  plugins: [react(), dts()],

  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: packageJson.name,
      fileName: `index`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },

  test: {
    environment: "jsdom",
  },
});
