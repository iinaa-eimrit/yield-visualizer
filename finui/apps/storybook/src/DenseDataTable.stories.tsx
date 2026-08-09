import type { Meta, StoryObj } from '@storybook/react'
import { DenseDataTable } from '@amrit_16/core'

const meta: Meta<typeof DenseDataTable> = {
  title: 'Core/DenseDataTable',
  component: DenseDataTable,
}
export default meta

type Story = StoryObj<typeof DenseDataTable>

const generateData = (numRows: number) => {
  return Array.from({ length: numRows }).map((_, i) => ({
    id: i,
    symbol: `SYM${i}`,
    price: (Math.random() * 100).toFixed(2),
    change: (Math.random() * 10 - 5).toFixed(2),
    volume: Math.floor(Math.random() * 1000000),
  }))
}

const columns = [
  { accessorKey: 'symbol', header: 'Symbol', size: 100 },
  { accessorKey: 'price', header: 'Price', size: 100, meta: { isNumeric: true } },
  { accessorKey: 'change', header: 'Change %', size: 100, meta: { isNumeric: true } },
  { accessorKey: 'volume', header: 'Volume', size: 120, meta: { isNumeric: true } },
]

export const Default: Story = {
  args: {
    columns,
    data: generateData(100),
    height: 400,
  },
}

export const MassiveDataVirtualization: Story = {
  args: {
    columns,
    data: generateData(10000),
    height: 600,
  },
}
