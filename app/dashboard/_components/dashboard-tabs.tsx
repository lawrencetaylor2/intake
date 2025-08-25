'use client'
import { Button } from '@/components/ui/button'
import { Plus, Table2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export interface TabLink {
  label: string
  url: string
}
// Define the props for the DashboardTabs component
interface DashboardTabProps {
  tabLinks: TabLink[]
}

export default function DashboardTabs(tabProps: DashboardTabProps) {
  const pathname = usePathname()

  return (
    <div className="relative bg-white  w-full border-1 border-l-0 border-r-0  p-2 mt-10 text-sm  ">
      <div className="absolute top-0 flex flex-row -mt-10 w-full justify-start">
        {tabProps.tabLinks.map((item) => {
          const isActive = pathname === item.url
          return (
            <Button
              key={item.url}
              variant="ghost"
              className={`border-1 h-10 p-2 ml-2 pb-0 flex gap-2 rounded-b-none ${
                isActive
                  ? 'bg-white border-b-0 rounded-t-sm hover:bg-white'
                  : ' border-none nth-odd:border-r-2'
              }`}
            >
              <Table2 />
              <Link href={item.url}>
                <span>{item.label}</span>
              </Link>
            </Button>
          )
        })}

        {/*TabItem */}
        <div className="items-center h-10 p-2 ml-2  pb-0 border-b-0 flex gap-2">
          <Plus />
          <span>New View</span>
        </div>
      </div>
    </div>
  )
}
