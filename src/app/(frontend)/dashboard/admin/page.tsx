import { getMeUser } from '@/utilities/getMeUser'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const { user } = await getMeUser({
    nullUserRedirect: '/login',
  })

  if (user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

    </div>
  )
}