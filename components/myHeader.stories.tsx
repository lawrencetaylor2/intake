// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import '@/app/globals.css'

import { MyHeader } from '@/components/myHeader'

const meta = {
  component: MyHeader,

  decorators: [
    (Story, context) => {
      console.log(context)
      return (
        <div className="h-screen bg-white">
          <Story {...context} />
        </div>
      )
    },
  ],
} satisfies Meta<typeof MyHeader>

export default meta
type Story = StoryObj<typeof meta>
// three ways to pass child components, 1 as element, 2 as compenent,3 as function.
//this is like a wrapper function for a component
// components should be define outside of the page component
//const lucideActivityIcon = () => <ActivityIcon />

export const Header: Story = {} satisfies Story
