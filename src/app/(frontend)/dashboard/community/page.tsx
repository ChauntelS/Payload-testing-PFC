import { getMeUser } from '@/utilities/getMeUser'
import { redirect } from 'next/navigation'

export default async function CommunityDashboard() {
  const { user } = await getMeUser({
    nullUserRedirect: '/login',
  })

  if (user.role !== 'community' && user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div>
      <h1>Community Dashboard</h1>

      <ul>

      </ul>
    </div>
  )
}