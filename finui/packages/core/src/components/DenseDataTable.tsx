import React, { useRef } from 'react'
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, ColumnDef, SortingState } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

export interface DenseTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  height?: number;
  onRowClick?: (row: TData) => void;
  stickyFirstColumn?: boolean;
}

export function DenseDataTable<TData>({ columns, data, height = 600, stickyFirstColumn = true }: DenseTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 32,
    overscan: 10,
  })

  return (
    <div ref={tableContainerRef} style={{ height, overflowY: 'auto' }} className="border border-gray-200 rounded-sm outline-none" tabIndex={0}>
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
        <table className="w-full border-collapse absolute top-0 left-0" role="grid">
          <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#e2e8f0]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-2xs py-3xs text-left text-2xs font-semibold text-gray-500 bg-white cursor-pointer select-none"
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                      aria-sort={isSorted ? (isSorted === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {isSorted && (
                           <span className="text-fin-blue-500">
                             {isSorted === 'asc' ? '▲' : '▼'}
                           </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index]
              return (
                <tr 
                  key={row.id} 
                  className="hover:bg-fin-slate-50 absolute w-full flex items-center"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isFirst = index === 0 && stickyFirstColumn;
                    return (
                      <td
                        key={cell.id}
                        className={`px-2xs py-3xs text-xs overflow-hidden text-ellipsis whitespace-nowrap ${
                          isFirst ? 'sticky left-0 bg-white font-medium z-[1] shadow-[1px_0_0_#e2e8f0]' : ''
                        }`}
                        style={{
                          width: cell.column.getSize(),
                          textAlign: (cell.column.columnDef.meta as any)?.isNumeric ? 'right' : 'left',
                          fontFamily: (cell.column.columnDef.meta as any)?.isNumeric ? 'JetBrains Mono, monospace' : undefined,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
