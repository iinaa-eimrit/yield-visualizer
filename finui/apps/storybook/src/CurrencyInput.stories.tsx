import type { Meta, StoryObj } from '@storybook/react'
import { CurrencyInput } from '@amrit_16/core'
import React, { useState } from 'react'

const meta: Meta<typeof CurrencyInput> = {
  title: 'Core/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof CurrencyInput>

const CurrencyInputWithState = (args: any) => {
  const [val, setVal] = useState<number | null>(args.value || 10000)
  return <CurrencyInput {...args} value={val} onChange={setVal} />
}

export const Default: Story = {
  render: (args) => <CurrencyInputWithState {...args} />,
  args: {
    currency: 'USD',
  },
}

export const WithError: Story = {
  render: (args) => <CurrencyInputWithState {...args} />,
  args: {
    currency: 'USD',
    value: 50,
    error: 'Amount must be greater than $1,000',
  },
}
