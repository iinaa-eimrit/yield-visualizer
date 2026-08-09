import type { Meta, StoryObj } from '@storybook/react'
import { TickerBadge } from '@amrit_16/core'

const meta: Meta<typeof TickerBadge> = {
  title: 'Core/TickerBadge',
  component: TickerBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: { changePercent: { control: { type: 'number', step: 0.1 } } },
}
export default meta

type Story = StoryObj<typeof TickerBadge>

export const Positive: Story = { args: { symbol: 'AAPL', changePercent: 1.2 } }
export const Negative: Story = { args: { symbol: 'TSLA', changePercent: -3.5 } }
export const Neutral: Story = { args: { symbol: 'USD', changePercent: 0 } }
export const CompactVariant: Story = { args: { symbol: 'BTC', changePercent: 2.1, variant: 'compact' } }
