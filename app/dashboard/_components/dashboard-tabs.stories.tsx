// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DashboardTabs } from './dashboard-tabs'
import '@/app/globals.css'
import { ActivityIcon, Table2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MyHeader } from '@/components/myHeader'

const meta = {
  component: DashboardTabs,
  decorators: [
    (Story, context) => {
      console.log(context)
      return (
        <div className="h-screen bg-white">
          <Story {...context} />
          <main className="container p-4">Tab Content will go here</main>
        </div>
      )
    },
  ],
} satisfies Meta<typeof DashboardTabs>

export default meta
type Story = StoryObj<typeof meta>
// three ways to pass child components, 1 as element, 2 as compenent,3 as function.
//this is like a wrapper function for a component
// components should be define outside of the page component
//const lucideActivityIcon = () => <ActivityIcon />

export const Tabs: Story = {
  args: {
    tabLinks: [
      { label: 'Tab 1', url: '/', icon: <ActivityIcon /> },
      { label: 'Tab 2', url: '/home', icon: <Table2 /> },
      { label: 'Tab 3', url: '#', icon: <Table2 /> },
      { label: 'Tab 4', url: '#', icon: <Table2 /> },
    ],
    addViewPopoverContent: (
      <div className="w-full flex flex-col gap-4">
        Test Content
        <Button>OK</Button>
      </div>
    ),
  },
} satisfies Story
