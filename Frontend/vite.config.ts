import { defineConfig,loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default ({ mode }:{mode:string}) => {
  // Load environment variables based on the mode
    const env = loadEnv(mode === 'development' ? '' : mode, process.cwd(), '');

    return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] })
    ],

    define: {
    'process.env': env,
    },
    
    });
};
