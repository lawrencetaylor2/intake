import Passkey from 'next-auth/providers/passkey'
import NextAuth from 'next-auth'
import Apple from 'next-auth/providers/apple'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@/drizzle.server'
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from './db/schema'
import { env } from '@/app/utils/Environment'
import { eq, and } from 'drizzle-orm'

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: env.NODE_ENV !== 'production',
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  providers: [
    Google({
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
    Apple,
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
  callbacks: {
    session: async ({ session, user }) => {
      // Get the account record for the user where the provider is google or apple
      const googleAccount = await db.query.accounts.findFirst({
        where: and(
          eq(accounts.userId, user.id),
          eq(accounts.provider, 'google')
        ),
      })
      if (
        googleAccount &&
        googleAccount.refresh_token &&
        googleAccount.expires_at &&
        googleAccount.expires_at * 1000 < Date.now()
      ) {
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            body: JSON.stringify({
              client_id: env.AUTH_GOOGLE_ID,
              client_secret: env.AUTH_GOOGLE_SECRET,
              grant_type: 'refresh_token',
              refresh_token: googleAccount.refresh_token,
            }),
          })

          const tokensOrError = await response.json()

          if (!response.ok) throw tokensOrError

          const newTokens = tokensOrError as {
            access_token: string
            expires_in: number
            refresh_token?: string
          }

          await db
            .update(accounts)
            .set({
              access_token: newTokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token:
                newTokens.refresh_token ?? googleAccount.refresh_token,
            })
            .where(
              and(
                eq(accounts.provider, 'google'),
                eq(accounts.providerAccountId, googleAccount.providerAccountId)
              )
            )
        } catch (error) {
          console.error('Error refreshing access_token', error)
          // If we fail to refresh the token, return an error so we can handle it on the page
          session.error = 'RefreshTokenError'
        }
      }

      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError'
  }
}
