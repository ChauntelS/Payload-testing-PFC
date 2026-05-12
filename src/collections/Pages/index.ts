import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

import { hero } from '@/heros/config'
import { slugField } from 'payload'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'

import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'



import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // PAGE ACCESS CONTROL
    {
      name: 'requiresAuth',
      type: 'checkbox',
      label: 'Require Login',
      defaultValue: false,

      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'allowedRoles',
      type: 'select',
      hasMany: true,
      label: 'Allowed Roles',

      options: [
        {
          label: 'PFC Admin',
          value: 'admin',
        },
        {
          label: 'Hub Staff',
          value: 'staff',
        },
        {
          label: 'PFC Manager',
          value: 'manager',
        },
        {
          label: 'Hub Member',
          value: 'hub',
        },
        {
          label: 'Community Member',
          value: 'community',
        },
      ],

      admin: {
        position: 'sidebar',

        // only show if auth required
        condition: (_, siblingData) => {
          return siblingData.requiresAuth
        },
      },
    },
    {
      type: 'tabs',

      tabs: [
        {
          label: 'Hero',

          fields: [hero],
        },

        {
          label: 'Content',

          fields: [
            {
              name: 'layout',

              type: 'blocks',

              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
              ],

              required: true,

              admin: {
                initCollapsed: true,
              },
            },
          ],
        },

        {
          name: 'meta',

          label: 'SEO',

          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),

            MetaTitleField({
              hasGenerateFn: true,
            }),

            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),

            PreviewField({
              hasGenerateFn: true,

              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    {
      name: 'publishedAt',

      type: 'date',

      admin: {
        position: 'sidebar',
      },
    },

    slugField(),
  ],

  hooks: {
    afterChange: [revalidatePage],

    beforeChange: [populatePublishedAt],

    afterDelete: [revalidateDelete],
  },

  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },

      schedulePublish: true,
    },

    maxPerDoc: 50,
  },
}