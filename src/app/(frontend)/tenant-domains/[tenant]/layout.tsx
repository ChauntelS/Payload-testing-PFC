import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tenant: string }>
}) {
  const { tenant } = await params
  const payload = await getPayload({ config: configPromise })
  
  const tenantsQuery = await payload.find({
    collection: 'tenants',
    where: {
      slug: { equals: tenant },
    },
    depth: 1,
  })
  
  const currentTenant = tenantsQuery.docs[0]
  
  return (
    <>
      {/* {currentTenant && (
        <NavBar branding={currentTenant.branding} navItems={currentTenant.navItems || []} />
      )} */}
      <main>
        {children}
      </main>
    </>
  )
}
