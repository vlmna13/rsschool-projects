import { defineConfig } from 'vite';
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig({
  base: '/vlmna13-JSFE2024Q4/decision-making-tool/',
  plugins: [
    ghPages({
      branch: 'gh-pages',
      dest: 'decision-making-tool'
    })
  ],
});
