import { isSuperAdmin } from '@/access/isAdmin' // TODO
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs' // TODO
import { Access } from 'payload'

export const updateAndDeleteAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user)) {
    return true
  }

  return {
    id: {
      in: getUserTenantIDs(req.user, 'admin'),
    },
  }
}
