// .storybook/auth-mock.ts
console.log('✅ Using Storybook mock for @/auth')

let mockSession: any = {
  user: { name: 'Storybook User', email: 'storybook@example.com' },
  expires: '2099-12-31T23:59:59.999Z',
}

export function setMockSession(session: any) {
  mockSession = session
}

export const auth = () => {
  return mockSession
}
export async function signOut() {
  setMockSession({})
  return mockSession
}
