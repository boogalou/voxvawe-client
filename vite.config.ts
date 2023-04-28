import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'app': path.resolve(__dirname, 'src/app'),
      'components': path.resolve(__dirname, 'src/components'),
      'entities': path.resolve(__dirname, 'src/entities'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  plugins: [react(), svgr(), tsconfigPaths()],
});
