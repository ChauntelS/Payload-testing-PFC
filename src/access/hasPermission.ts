import { rolePermissions, Permission } from "./permissions";

type User = {
    role?: string
}

type PermissionWithWildcard = Permission | '*'

export const hasPermission = (
    user: User | null,
    permissin: Permission
) => {
    if (!user) return false

    const role = user.role as keyof typeof rolePermissions

    const permissions = rolePermissions[role] as PermissionWithWildcard[]

    if (!permissions) return false

    if (permissions.includes('*')) return true

    return permissions.includes(permissin)
}