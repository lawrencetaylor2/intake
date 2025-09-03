import { Meta, StoryObj } from '@storybook/nextjs-vite'
import DashboardTable from './dashboard-table'
import '@/app/globals.css'

const meta = {
  component: DashboardTable,
  decorators: [
    (Story, context) => {
      console.log(context)
      return (
        <div>
          <Story {...context} />
        </div>
      )
    },
  ],
} satisfies Meta<typeof DashboardTable>

export default meta

type Story = StoryObj<typeof meta>
export const MyDashboard: Story = {
  args: {
    columnDefs: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'Title' },
      { key: 'age', label: 'Age' },
      { key: 'name', label: 'Name' },
      { key: '1', label: 'Status' },
    ],
  },
} satisfies Story
