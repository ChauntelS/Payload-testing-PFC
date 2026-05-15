import type { Metadata } from 'next'

import { headers, draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'


import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCurrentTenant } from '@/utilities/getTenant'



export async function generateStaticParams() {
  // const payload = await getPayload({
  //   config: configPromise,
  // })

  // const pages = await payload.find({
  //   collection: 'pages',
  //   draft: false,
  //   limit: 1000,
  //   overrideAccess: false,
  //   pagination: false,

  //   select: {
  //     slug: true,
  //   },
  // })

  // const params = pages.docs
  //   ?.filter((doc) => {
  //     return doc.slug !== 'home'
  //   })
  //   .map(({ slug }) => {
  //     return { slug }
  //   })

  // return params

  // Commented out, working model uses a dynamic route 
  // Disables static generation

  return []

}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const headersList = await headers()
  const domain = headersList.get('x-tenant-domain') || 'localhost'

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    domain,
  })

  if (!page) {
    return (
      <article className="pt-16 pb-24">
        <div className="container">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Page Not Found</h1>
            <p>
              The page "{decodedSlug}" could not be found. Please check the URL or go back to the home page.
            </p>
          </div>
        </div>
      </article>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const headersList = await headers()
  const domain = headersList.get('x-tenant-domain') || 'localhost'

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    domain,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, domain }: { slug: string; domain: string }) => {
  const { isEnabled: draft } = await draftMode()
  const tenant = await getCurrentTenant(domain)

  if (!tenant) {
    console.warn(`\u2717 Page query failed: No tenant found for domain \"${domain}\" (slug: ${slug})`)
    return null
  }

  console.log(`\u2713 Querying page slug \"${slug}\" for tenant \"${tenant.name}\" (domain: ${domain})`)

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
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

  if (!result.docs?.[0]) {
    console.warn(`\u2717 Page not found: slug \"${slug}\" for tenant \"${tenant.name}\"`)
    return null
  }

  console.log(`\u2713 Found page \"${result.docs[0].title}\"`)
  return result.docs[0] || null
})

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export default async function Page({
//   params: paramsPromise,
// }: Args) {
//   const { isEnabled: draft } = await draftMode()
//   const { slug = 'home' } = await paramsPromise
//   // Decode to support slugs with special characters
//   const decodedSlug = decodeURIComponent(slug)

//   const url = '/' + decodedSlug

//   let page: RequiredDataFromCollectionSlug<'pages'> | null

//   page = await queryPageBySlug({
//     slug: decodedSlug,
//   })

//   // Remove this code once your website is seeded
//   if (!page && slug === 'home') {
//     page = homeStatic
//   }

//   if (!page) {
//     return <PayloadRedirects url={url} />
//   }

//   // ACCESS CONTROL
//   const payload = await getPayload({
//     config: configPromise,
//   })

//   const headersList = await headers()

//   const { user } = await payload.auth({
//     headers: headersList,
//   })

//   // REQUIRE LOGIN
//   if (page.requiresAuth && !user) {
//     return redirect('/login')
//   }

//   // ROLE-BASED ACCESS
//   if (
//     page.allowedRoles &&
//     page.allowedRoles.length > 0
//   ) {
//     const userRole = user?.role

//     const hasAccess =
//       userRole &&
//       page.allowedRoles.includes(userRole)

//     if (!hasAccess) {
//       return notFound()
//     }
//   }

//   const { hero, layout } = page

//   return (
//     <article className="pt-16 pb-24">
//       <PageClient />

//       {/* Allows redirects for valid pages too */}
//       <PayloadRedirects
//         disableNotFound
//         url={url}
//       />

//       {draft && <LivePreviewListener />}

//       <RenderHero {...hero} />

//       <RenderBlocks blocks={layout} />
//     </article>
//   )
// }

// export async function generateMetadata({
//   params: paramsPromise,
// }: Args): Promise<Metadata> {
//   const { slug = 'home' } = await paramsPromise

//   // Decode to support slugs with special characters
//   const decodedSlug = decodeURIComponent(slug)

//   const page = await queryPageBySlug({
//     slug: decodedSlug,
//   })

//   return generateMeta({
//     doc: page,
//   })
// }

// const queryPageBySlug = cache(
//   async ({ slug }: { slug: string }) => {
//     const { isEnabled: draft } =
//       await draftMode()

//     const payload = await getPayload({
//       config: configPromise,
//     })

//     const result = await payload.find({
//       collection: 'pages',
//       draft,
//       limit: 1,
//       pagination: false,
//       overrideAccess: draft,

//       where: {
//         slug: {
//           equals: slug,
//         },
//       },
//     })

//     return result.docs?.[0] || null
//   },
// )