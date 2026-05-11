import { getMeUser } from '@/utilities/getMeUser'
import { redirect } from 'next/navigation'

export default async function HubDashboard() {
  const { user } = await getMeUser({
    nullUserRedirect: '/login',
  })

  if (user.role !== 'hub' && user.role !== 'admin') {
    redirect('/dashboard')
  }

  if (user.role !== 'hub' && user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div>
      <h1>Hub Member Dashboard</h1>

      <ul>

      </ul>
    </div>
  )
}