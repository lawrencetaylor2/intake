import DashboardTable from '@/app/dashboard/dashboard-table'

import {
  DashboardTabs,
  TabLink,
} from '@/app/dashboard/_components/dashboard-tabs'
import * as dal from '@/lib/dal'
import {
  ServiceRequestRecord,
  defaultColumnConfig,
} from '@/components/tableConfig' // <-- Add this import

const DashboardPage = async () => {
  // Load Column Configuration

  //get Saved Column Configuration
  const userColumnConfigRow = await dal.getOneUserColumnConfig(
    'service_requests'
  )
  let userColumnDef: ServiceRequestRecord[]
  if (!userColumnConfigRow) {
    const tableColumnDefinition = defaultColumnConfig as ServiceRequestRecord[]
    await dal.saveTableConfiguration('service_requests', tableColumnDefinition)
    userColumnDef = tableColumnDefinition
  } else {
    userColumnDef = userColumnConfigRow.config as ServiceRequestRecord[]
  }

  const tabs: TabLink[] = [
    { label: 'Service Requests', url: '/dashboard' },
    { label: 'Home', url: '/' },
  ]
  const organizationDetails = await dal.getOrganization()

  return (
    <>
      {/*<pre className="text-wrap">{JSON.stringify(session?.user)}</pre>*/}
      {/*Tabs */}
      <div className="container p-6">
        <h1 className="text-xl font-bold">{organizationDetails?.name}</h1>
      </div>
      <DashboardTabs tabLinks={tabs}></DashboardTabs>
      <DashboardTable columnDefs={userColumnDef}></DashboardTable>
    </>
  )
}
export default DashboardPage
