import { MyHeader } from '@/components/myHeader'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MyHeader />
      {children}
    </>
  )
}
