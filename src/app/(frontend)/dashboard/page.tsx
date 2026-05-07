import { redirect } from 'next/navigation'
import { getMeUser } from '@/utilities/getMeUser'

export default async function DashboardPage() {
  const { user } = await getMeUser({
    nullUserRedirect: '/login',
  })

  switch (user.role) {
    case 'community':
      redirect('/dashboard/community')

    case 'hub':
      redirect('/dashboard/hub')

    case 'staff':
      redirect('/dashboard/staff')

    case 'manager':
      redirect('/dashboard/manager')

    case 'admin':
      redirect('/dashboard/admin')

    default:
      redirect('/login')
  }
}