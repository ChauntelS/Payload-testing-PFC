import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { getTenantByDomain } from './getTenant'
import type { Header, Footer } from '@/payload-types'

type TenantGlobal = 'header' | 'footer'

async function getTenantGlobal<T extends TenantGlobal>(
  slug: T,
  domain: string,
  depth = 0,
): Promise<T extends 'header' ? Header : Footer> {
  const tenant = await getTenantByDomain(domain)

  if (!tenant) {
    // Return empty default structure when tenant not found
    console.warn(`✗ No ${slug} found: tenant not found for domain "${domain}"`)
    if (slug === 'header') {
      return { navItems: [] } as any
    }
    return { navItems: [] } as any
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: slug as any,
      where: {
        tenant: {
          equals: tenant.id,
        },
      },
      depth,
      limit: 1,
    })

    if (result.docs.length === 0) {
      // Return empty default structure
      console.warn(`✗ No ${slug} records found for tenant "${tenant.name}" (id: ${tenant.id})`)
      if (slug === 'header') {
        return { navItems: [] } as any
      }
      return { navItems: [] } as any
    }

    console.log(`✓ Found ${slug} for tenant "${tenant.name}"`)
    return result.docs[0] as any
  } catch (error) {
    console.error(`✗ Error fetching ${slug} for tenant:`, error)
    // Return empty default on error
    if (slug === 'header') {
      return { navItems: [] } as any
    }
    return { navItems: [] } as any
  }
}

/**
 * Returns a cached function for tenant-specific globals
 * Pass the domain extracted from headers
 */
export const getCachedTenantGlobal = <T extends TenantGlobal>(slug: T, domain: string, depth = 0) =>
  unstable_cache(async () => getTenantGlobal(slug, domain, depth), [slug, domain], {
    tags: [`global_${slug}_${domain}`],
  })
