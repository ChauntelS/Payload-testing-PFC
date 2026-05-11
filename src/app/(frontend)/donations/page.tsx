import { getPayload } from 'payload'
import config from '@/payload.config'

import type { Donation } from '@/payload-types'

export default async function DonationsPage() {
  const payload = await getPayload({ config })

  const donations = await payload.find({
    collection: 'donations',
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">
        Donations
      </h1>

      <div className="w-full max-w-2xl space-y-6">
        {donations.docs.map((donation: Donation) => (
          <div
            key={donation.id}
            className="border rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {donation.title}
            </h2>

            <p className="mb-4">
              {donation.description}
            </p>

            <p className="mb-4 font-medium">
              ${donation.currentAmount ?? 0} raised of $
              {donation.goalAmount ?? 0}
            </p>

            <button className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition">
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}