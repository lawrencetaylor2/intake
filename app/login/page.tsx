'use client'

import { signOut, useSession } from 'next-auth/react'
import { signIn } from 'next-auth/webauthn'
import { signIn as signInReact } from 'next-auth/react'
import { Button } from '@/components/ui/button'
export default function Login() {
  const { data: session, update, status } = useSession()

  return (
    <div>
      {status === 'authenticated' ? (
        <div>
          <Button onClick={() => signIn('passkey', { action: 'register' })}>
            Register new Passkey
          </Button>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : status === 'unauthenticated' ? (
        <div>
          <Button onClick={() => signIn('passkey')}>
            Sign in with Passkey
          </Button>
          <Button onClick={() => signInReact('google')}>
            Sign in with Google
          </Button>
          <Button onClick={() => signInReact('apple')}>
            Sign in with Apple
          </Button>
        </div>
      ) : null}
    </div>
  )
}
