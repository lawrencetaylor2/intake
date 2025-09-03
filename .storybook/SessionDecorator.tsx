import React from 'react'
import { SessionProvider } from 'next-auth/react'
// Client Side Session Decorator
export const SessionDecorator = (Story) => {
  const mockSession = {
    expires: '2099-12-31T23:59:59.999Z',
    user: {
      name: 'Storybook User',
      role: 'user',
      email: 'user@user.com',
      roles: [],
    },
  }
  return (
    <SessionProvider session={mockSession}>
      <Story />
    </SessionProvider>
  )
}
