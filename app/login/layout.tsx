// app/layout.tsx
import { AuthProvider } from '@/app/AuthProvider' // Or wherever your AuthProvider is located

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
