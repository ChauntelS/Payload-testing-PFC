import { getMeUser } from '@/utilities/getMeUser'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getMeUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <DashboardNav />
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}