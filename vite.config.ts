import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Check if we are building for GitHub Pages specifically
// We will set this environment variable in the GitHub Actions workflow or package.json script
const isGitHubPages = process.env.VITE_DEPLOY_TARGET === 'github-pages';

export default defineConfig(({ mode }) => ({
  // CHANGE THIS LINE: Use "./" to make paths relative
  base: "./", 

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-tabs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
