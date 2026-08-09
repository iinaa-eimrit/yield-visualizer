import { finuiPreset } from '@amrit_16/design-tokens/src/preset'
import type { Config } from 'tailwindcss'

const config: Config = {
  presets: [finuiPreset],
  content: ['./src/**/*.{ts,tsx}'],
}

export default config
