import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // target: "http://61.131.156.241:10087/",
        changeOrigin: true,
        xfwd: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    // https: {
    //   key: "C:/Users/Wuser/Desktop/localhost+2-key.pem",
    //   cert: "C:/Users/Wuser/Desktop/localhost+2.pem",
    // },
    port:5173
  },
});
