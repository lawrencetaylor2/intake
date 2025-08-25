import { MyHeader } from '@/components/myHeader'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen">
      <MyHeader />
      {children}
    </div>
  )
}
