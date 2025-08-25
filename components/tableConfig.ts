// Client Side Utility functions for manipulating tansact table

import { createColumnHelper } from '@tanstack/react-table'

export type ServiceRequestRecord = {
  key: string
  label: string
  format: string | undefined
}
export const defaultColumnConfig: ServiceRequestRecord[] = [
  { key: 'id', label: 'ID', format: undefined },
  { key: 'name', label: 'Full Name', format: undefined },
  {
    key: 'age',
    label: 'Age',
    format: 'number',
  },
]

export interface Column {
  accessorKey: string
  header: string
  cell: (info: { getValue: () => unknown }) => unknown
}
type ColumnData = { [key: string]: any }

export const buildTableColumnDefsForConfiguration = (
  columnConfigurationFromDB: any
) => {
  const columnHelper = createColumnHelper<ColumnData>()

  const tableDefs = columnConfigurationFromDB.map((col): ColumnData => {
    // These are asceessor columns only
    return columnHelper.accessor(col.key, {
      header: col.label,
      footer: (props) => props.column.id,
      cell: (info: { getValue: () => unknown }) => {
        const value = info.getValue()
        if (col.format === 'number') {
          return new Intl.NumberFormat().format(value as number)
        }
        return value
      },
    })
  })
  console.log(tableDefs)
  return tableDefs
}
