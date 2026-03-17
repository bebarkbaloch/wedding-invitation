import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'deflatedly-solitudinous-alexis.ngrok-free.dev',
    ],
    hmr: {
      clientPort: 443, // important for ngrok https
    },
  },
})
