import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Tenant } from '@/payload-types'

/**
 * Get tenant by domain (can be cached)
 * This is separated from getCurrentTenant so it can be used inside cached functions
 */
export async function getTenantByDomain(domain: string): Promise<Tenant | null> {
  if (!domain) {
    console.warn('getTenantByDomain called with empty domain')
    return null
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const tenants = await payload.find({
      collection: 'tenants',
      where: {
        domain: {
          equals: domain,
        },
      },
    })

    if (tenants.docs.length > 0) {
      console.log(`✓ Found tenant for domain "${domain}":`, tenants.docs[0].name)
      return tenants.docs[0] as Tenant
    }

    console.warn(`✗ No tenant found for domain: "${domain}"`)
    return null
  } catch (error) {
    console.error(`✗ Error fetching tenant for domain "${domain}":`, error)
    return null
  }
}

/**
 * Get the current tenant based on the domain header
 * MUST be called outside of unstable_cache
 */
export async function getCurrentTenant(domain: string): Promise<Tenant | null> {
  return getTenantByDomain(domain)
}

/**
 * Get tenant by ID (for when you already know the ID)
 */
export async function getTenantByID(id: string | number): Promise<Tenant | null> {
  try {
    const payload = await getPayload({ config: configPromise })

    const tenant = await payload.findByID({
      collection: 'tenants',
      id,
      depth: 1,
    })

    return tenant as Tenant
  } catch (error) {
    console.error(`Error fetching tenant ${id}:`, error)
    return null
  }
}
