'use client'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LucideProps, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

export interface TabLink {
  label: string
  url: string
  icon?: ReactElement<LucideProps>
  endActionButton?: ReactElement<HTMLButtonElement>
}
// Define the props for the DashboardTabs component
interface DashboardTabProps {
  tabLinks: TabLink[]
  addViewPopoverContent: ReactElement<HTMLDivElement>
}

export const DashboardTabs = (tabProps: DashboardTabProps) => {
  const pathname = usePathname()

  return (
    <div className="relative bg-white  w-full border-1 border-l-0 border-r-0  p-2 mt-10 text-sm  ">
      <div className="absolute top-0 left-0 flex flex-row -mt-10 w-full justify-start">
        {tabProps.tabLinks.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link href={item.url} key={item.url}>
              <Button
                variant="ghost"
                className={`border-1 h-10 p-2 ml-2 pb-0 flex gap-2 rounded-b-none ${
                  isActive
                    ? 'bg-white border-b-0 rounded-t-sm hover:bg-white'
                    : ' border-none nth-odd:border-r-2'
                }`}
              >
                {item.icon}

                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}

        {/*TabItem */}
        <div className="items-center h-10 p-2 ml-2  pb-0 border-b-0 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <PlusIcon />
                <span>New View</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent>{tabProps.addViewPopoverContent}</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
