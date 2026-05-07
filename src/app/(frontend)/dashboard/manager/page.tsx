import { getMeUser } from '@/utilities/getMeUser'
import { redirect } from 'next/navigation'
import { hasPermission } from '@/access/hasPermission'
import { PERMISSIONS } from '@/access/permissions'

export default async function ManagerDashboard() {
  const { user } = await getMeUser({
    nullUserRedirect: '/login',
  })

  if (
    user.role !== 'manager' &&
    user.role !== 'admin'
  ) {
    redirect('/dashboard')
  }

  return (
    <div>
      <h1>Manager Dashboard</h1>

      


      
    </div>
  )
}