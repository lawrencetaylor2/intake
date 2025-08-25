'use client'
import { useMemo, useRef, useState } from 'react' //without useMemo or useState, react/next.js will rerender everything when the table changes
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import {
  ServiceRequestRecord,
  buildTableColumnDefsForConfiguration,
  Column,
} from '@/components/tableConfig'
import { Plus } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useHotkeys } from '@/hooks/useHotKeys'

import AddFieldButton from '@/app/dashboard/_components/add-field-button'

type ColumnData = { [key: string]: any }
export const DashboardTable = ({
  columnDefs,
}: {
  columnDefs: ServiceRequestRecord[]
}) => {
  //Tanstack Table column Helper f
  const columnHelper = createColumnHelper<ColumnData>()
  // useMemo is a React Hook that lets you cache the result of a calculation between re-renders. const cachedValue = useMemo(calculateValue, dependencies)
  const columns = useMemo<ColumnDef<Column, ServiceRequestRecord>[]>(() => {
    const dynamicColumns = buildTableColumnDefsForConfiguration(columnDefs)
    const addButton = columnHelper.display({
      id: '_add',

      /*Add Field Button */
      header: () => <AddFieldButton></AddFieldButton>,
    })
    return [...dynamicColumns, addButton]
  }, [columnDefs, columnHelper])
  //data
  const [data, setData] = useState(() => [
    { id: 1, age: 4, name: 'lawrence taylor' },
    { id: 2, age: 4, name: 'lawrence taylor' },
    { id: 3, age: 4, name: 'lawrence taylor' },
    { id: 4, age: 4, name: 'lawrence taylor' },
    { id: 5, age: 4, name: 'lawrence taylor' },
    { id: 6, age: 4, name: 'lawrence taylor' },
    { id: 7, age: 4, name: 'lawrence taylor' },
    { id: 8, age: 4, name: 'lawrence taylor' },
    { id: 9, age: 4, name: 'lawrence taylor' },
    { id: 10, age: 4, name: 'lawrence taylor' },
  ])

  const [itemFocus, setItemFocus] = useState(false)

  const handleCtrlSpace = () => {
    alert('Ctrl+Space was pressed!')
    // Add your custom logic here
  }

  useHotkeys(handleCtrlSpace)
  //columns
  /*
  title,asignees,status,schedule Date,work Period
*/
  const inputRef = useRef<HTMLInputElement>(null) // Create a ref to attach to the input

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <main className="h-screen w-full rounded-2xl shadow-md bg-white">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 whitespace-nowrap cursor-grab"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-100 text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center sticky backdrop-blur-md w-full bottom-3.5 p-2 ">
          <div className="w-full relative">
            <FormItem>
              <Input
                ref={inputRef}
                onFocus={() => setItemFocus(true)}
                onBlur={() => setItemFocus(false)}
                className="w-full rounded-sm border shadow-md p-6 pl-12"
                placeholder="Start typing to create an item"
              />
              <Button
                variant="ghost"
                className=" border cursor-pointer left-0 absolute   border-r-1 rounded-r-none p-6 w-10"
              >
                <Plus strokeWidth={1.5} />
              </Button>
              {!itemFocus && (
                <div
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                    setData([...data, { id: 11, age: 23, name: 'Gandolf' }])
                  }}
                  className="text-sm left-10 m-0.5 h-10 absolute p-4 bg-white pb-3 text-gray-500"
                >
                  You can use{' '}
                  <span className="border bg-white/50 p-1 ">
                    Control + Space
                  </span>{' '}
                  to add an item
                </div>
              )}
            </FormItem>
          </div>
        </div>
      </main>
    </>
  )
}

export default DashboardTable
