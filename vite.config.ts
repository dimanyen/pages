import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const htmlEntries = Object.fromEntries(
  readdirSync(__dirname)
    .filter((name) => name.endsWith(".html"))
    .map((name) => [name.replace(/\.html$/, ""), resolve(__dirname, name)]),
);

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: htmlEntries,
    },
  },
});
