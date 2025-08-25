'use client'

import { signOut, useSession } from 'next-auth/react'
import { signIn } from 'next-auth/webauthn'
import { signIn as signInReact } from 'next-auth/react'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { redirect } from 'next/navigation'
export default function Login() {
  const { data: session, update, status } = useSession()
  if (status === 'authenticated') {
    redirect('/dashboard')
    /*    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )*/
  } else if (status === 'unauthenticated') {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <Image
              className="-mt-4 -ml-6"
              src="/Intake_Ehr_logo-400px.png"
              alt="Intake EHR"
              width={400}
              height={267}
            ></Image>
            Login to your account
          </CardTitle>
          <CardDescription>
            <p>Enter your email below to login to your account</p>
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signInReact('google', { redirectTo: '/dashboard' })}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('passkey', { redirectTo: '/dashboard' })}
          >
            Sign in with Passkey
          </Button>
        </CardFooter>
      </Card>
    )
  } else {
    return null
  }
}
