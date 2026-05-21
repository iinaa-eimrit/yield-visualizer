/** @type {import('tailwindcss').Config} */
import { finuiPreset } from '@amrit_16/design-tokens'

export default {
  presets: [finuiPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Important: we need to scan the finui components for their classes
    "./node_modules/@amrit_16/core/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
