// app/providers.tsx (or app/AuthProvider.tsx)
'use client'; // This marks it as a client component
import { SessionProvider } from 'next-auth/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
