import type { Meta, StoryObj } from '@storybook/react'
import { Sparkline } from '@amrit_16/core'

const meta: Meta<typeof Sparkline> = {
  title: 'Core/Sparkline',
  component: Sparkline,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof Sparkline>

export const PositiveTrend: Story = {
  args: {
    data: [1, 2, 1.5, 3, 4, 3.5, 5, 4.5, 6, 8],
    width: 100,
    height: 30,
    positive: true,
  },
}

export const NegativeTrend: Story = {
  args: {
    data: [8, 6, 7, 5, 4, 4.5, 3, 2, 2.5, 1],
    width: 100,
    height: 30,
    positive: false,
  },
}
