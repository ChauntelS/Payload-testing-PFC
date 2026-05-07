import type { CollectionConfig } from 'payload'
import { hasPermission } from '../../access/hasPermission'
import { PERMISSIONS } from '../../access/permissions'

export const Events: CollectionConfig = {
  slug: 'events',

  access: {
    read: () => true,

    create: ({ req }) =>
      hasPermission(req.user, PERMISSIONS.EVENT_CREATE_INTERNAL),

    delete: ({ req }) =>
      hasPermission(req.user, PERMISSIONS.EVENT_APPROVE),
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}