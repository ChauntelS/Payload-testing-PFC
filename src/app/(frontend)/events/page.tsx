'use client '
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

import { hasPermission } from '@/access/hasPermission'
import { PERMISSIONS } from '@/access/permissions'

export default async function EventsPage() {
  const payload = await getPayload({ config })


  const headersList = await headers()

  const { user } = await payload.auth({
    headers: headersList,
  })

  const events = await payload.find({
    collection: 'events' as any,
  })

  const canCreate = hasPermission(user, PERMISSIONS.EVENT_CREATE_INTERNAL)
  const canDelete = hasPermission(user, PERMISSIONS.EVENT_APPROVE)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Events</h1>

      <p>
        Logged in as: <strong>{user?.role || 'Guest'}</strong>
      </p>

      {canCreate && (
        <button style={{ marginBottom: '20px' }}>
          + Create Event
        </button>
      )}

      {events.docs.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.docs.map((event: any) => (
          <div key={event.id}>
            <h3>{event.title}</h3>

            {canDelete && (
              <button style={{ color: 'red' }}>
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}