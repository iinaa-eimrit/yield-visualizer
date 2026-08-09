import type { Meta, StoryObj } from '@storybook/react'
import { FinMetric } from '@amrit_16/core'

const meta: Meta<typeof FinMetric> = {
  title: 'Core/FinMetric',
  component: FinMetric,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof FinMetric>

export const Percentage: Story = {
  args: {
    label: '10Y Bond Target',
    value: 4.15,
    formatter: 'percentage',
    trend: 'positive',
  },
}

export const Currency: Story = {
  args: {
    label: 'Portfolio AUM',
    value: 12500000,
    formatter: 'currency',
    trend: 'positive',
  },
}

export const BasisPoints: Story = {
  args: {
    label: 'Spread',
    value: 45,
    formatter: 'bps',
    trend: 'negative',
  },
}

export const Loading: Story = {
  args: {
    label: 'Spread',
    value: 0,
    loading: true,
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Spread',
    value: 0,
    error: 'Failed to load metric data',
  },
}
