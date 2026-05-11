import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',

  access: {
    // EVERYONE can see donations
    read: () => true,

    // ONLY admins can create donation campaigns/pages
    create: ({ req }) => {
      return req.user?.role === 'admin'
    },

    // ONLY admins can edit
    update: ({ req }) => {
      return req.user?.role === 'admin'
    },

    // ONLY admins can delete
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'goalAmount',
      type: 'number',
    },
    {
      name: 'currentAmount',
      type: 'number',
      defaultValue: 0,
    },
  ],
}