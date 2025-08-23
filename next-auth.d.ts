import { roles } from '@/db/schema/authtables'
declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError'
  }
  interface User {
    roles?: roles.$inferSelect | []
  }
}
