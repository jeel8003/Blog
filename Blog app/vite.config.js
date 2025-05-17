import { defineConfig } from 'vite'

/** @type {import('tailwindcss').Config} */
import react from '@vitejs/plugin-react';
export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Include all your React JS files
  ],
  theme: {
    extend: {},
  },
  
  plugins: [react()],
});
