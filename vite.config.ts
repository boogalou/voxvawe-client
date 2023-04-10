import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, "src")},
    ],
  },
  plugins: [react(), svgr(), tsconfigPaths()],
})