import Link from 'next/link'

import { getMeUser } from '@/utilities/getMeUser'
import { hasPermission } from '@/access/hasPermission'
import { PERMISSIONS } from '@/access/permissions'

import { LogoutButton } from '../LogoutButton'

export async function DashboardNav() {
  const { user } = await getMeUser()

  // safety guard
  if (!user) {
    return (
      <nav>
        <Link href="/login">Login</Link>
      </nav>
    )
  }

  return (
    <nav className="flex flex-col gap-4">

      <div className="mb-4">
        Welcome, {user.name ?? 'User'}
      </div>

      {hasPermission(user, PERMISSIONS.DONATE) && (
        <Link href="/dashboard/donate">
          Make a Donation
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.DONATION_MANAGE) && (
        <Link href="/dashboard/donations">
          Manage Donations
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.SERVICE_VIEW) && (
        <Link href="/dashboard/services">
          View Services
        </Link>
      )}


      {hasPermission(user, PERMISSIONS.EVENT_VIEW) && (
        <Link href="/dashboard/events">
          View Events
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.EVENT_CREATE_EXTERNAL) && (
        <Link href="/dashboard/events/create">
          Create/Book Event External
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.EVENT_CREATE_INTERNAL) && (
        <Link href="/dashboard/events/create/internal">
          Create/Book Event Internal
        </Link>
      )}
      

      {hasPermission(user, PERMISSIONS.EVENT_APPROVE) && (
        <Link href="/dashboard/event-approvals">
          Approve Events
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.FEEDBACK_SUBMIT) && (
        <Link href="/dashboard/feedback/submit">
          Submit Feedback
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.FEEDBACK_VIEW) && (
        <Link href="/dashboard/feedback">
          View Feedback
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.NAVIGATOR_PORTAL_VIEW) && (
        <Link href="/dashboard/navigator">
          Navigator Portal View
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.NAVIGATOR_PORTAL_ACCESS) && (
        <Link href="/dashboard/navigator">
          Navigator Portal Access
        </Link>
      )}


      {hasPermission(user, PERMISSIONS.FLORIZEL_BOOKING) && (
        <Link href="/dashboard/florizel">
          Florizel Bookings
        </Link>
      )}


      {hasPermission(user, PERMISSIONS.CHILDMINDING_ACCESS) && (
        <Link href="/dashboard/childminding">
          Childminding Access
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.PMS_BOOKING) && (
        <Link href="/dashboard/pms">
          PMS Bookings
        </Link>
      )}

      
      {hasPermission(user, PERMISSIONS.SPACE_BOOKING) && (
        <Link href="/dashboard/bookings">
          Space Bookings
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.SPACE_BOOKING_APPROVE) && (
        <Link href="/dashboard/space-approvals">
          Approve Space Bookings
        </Link>
      )}

      {hasPermission(user, PERMISSIONS.APPOINTMENT_APPROVE) && (
        <Link href="/dashboard/appointment-approvals">
          Approve Appointments
        </Link>
      )}

      <div className="mt-6">
        <LogoutButton />
      </div>

    </nav>
  )
}
