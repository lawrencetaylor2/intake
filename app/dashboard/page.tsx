import { auth } from '@/auth'
const DashboardPage = async () => {
  const session = await auth()
  return (
    <>
      <div>Dashboard Home</div>
      <pre className="text-wrap">{JSON.stringify(session?.user)}</pre>
    </>
  )
}
export default DashboardPage
