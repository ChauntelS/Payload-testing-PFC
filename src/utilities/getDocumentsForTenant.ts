import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { getCurrentTenant } from './getTenant'

type Collection = 'pages' | 'posts'

async function getDocumentForTenant(collection: Collection, slug: string, domain: string, depth = 0) {
  const tenant = await getCurrentTenant(domain)

  if (!tenant) {
    console.warn(`✗ No tenant found for domain "${domain}" (slug: ${slug})`)
    return null
  }

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection,
    depth,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          tenant: {
            equals: tenant.id,
          },
        },
      ],
    },
  })

  return result.docs[0]
}

/**
 * Returns a cached function for tenant-specific documents
 * Pass the domain extracted from headers
 */
export const getCachedDocumentForTenant = (collection: Collection, slug: string, domain: string) =>
  unstable_cache(async () => getDocumentForTenant(collection, slug, domain), [collection, slug, domain], {
    tags: [`${collection}_${slug}_${domain}`],
  })

/**
 * Get all documents for a tenant in a collection
 */
async function getDocumentsForTenant(collection: Collection, domain: string, limit = 10, depth = 1) {
  const tenant = await getCurrentTenant(domain)

  if (!tenant) {
    console.warn(`✗ No documents found: tenant not found for domain "${domain}"`)
    return { docs: [] }
  }

  const payload = await getPayload({ config: configPromise })

  return await payload.find({
    collection,
    where: {
      tenant: {
        equals: tenant.id,
      },
    },
    limit,
    depth,
    sort: '-createdAt',
  })
}

export const getCachedDocumentsForTenant = (collection: Collection, domain: string, limit = 10) =>
  unstable_cache(async () => getDocumentsForTenant(collection, domain, limit), [collection, domain, String(limit)], {
    tags: [`${collection}_all_${domain}`],
  })
