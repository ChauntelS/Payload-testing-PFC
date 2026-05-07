import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',

  auth: true,
  
  access: {
    admin: ({req}) => {
      if (!req.user) return false
      return req.user.role === 'admin'
    },

    create: () => true, // public sign up

    read: ({req}) => !!req.user,
  update: ({req, id}) => {
    if (!req.user) return false
    if (req.user.role === 'admin') return true
    return req.user.id === id
  },
    delete: ({req}) => req.user?.role === 'admin',
  },

  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          return {
            ...data,
            role: 'community',
          }
        }
        return data
      },
    ],
  },

  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'community',
      options: [
        { label: 'Community Member', value: 'community' },
        { label: 'Hub Member', value: 'hub' },
        { label: 'PFC Manager', value: 'manager' },
        { label: 'Hub Staff', value: 'staff' },
        { label: 'PFC Admin', value: 'admin' },
      ],
    },
  ],
  timestamps: true,
}
