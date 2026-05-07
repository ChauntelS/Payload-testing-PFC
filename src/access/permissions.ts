export const PERMISSIONS = {

    // Donations
    DONATE: 'make_donation',
    DONATION_MANAGE: 'donation_manage',

    // Services
    SERVICE_VIEW: 'service_view',

    // Events
    EVENT_VIEW: 'event_view',
    EVENT_CREATE_EXTERNAL: 'event_create_external',
    EVENT_CREATE_INTERNAL: 'event_create_internal',
    EVENT_APPROVE: 'event_approve',

    //Feedback
    FEEDBACK_SUBMIT: 'feedback_submit',
    FEEDBACK_VIEW: 'feedback_view',

    // Navigator Portal
    NAVIGATOR_PORATL_ACCESS: 'navigator_portal_access',
    NAVIGATOR_PORTAL_VIEW: 'navigator_portal_view',

    // Booking & Appointments
    FLORIZEL_BOOKING: 'florizel_booking',
    CHILDMINDING_ACCESS: 'childminding_access',
    PMS_BOOKING: 'pms_booking',
    SPACE_BOOKING: 'space_booking',
    SPACE_BOOKING_APPROVE: 'space_booking_approve',
    APPOINTMENT_APPROVE: 'appointment_approve',
}as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

export const ROLES = {
    COMMUNITY: 'community',
    HUB: 'hub',
    MANAGER: 'manager',
    STAFF: 'staff',
    ADMIN: 'admin',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

export const rolePermissions: Record<Role, Permission[] | ['*']> = {

    community:[
        PERMISSIONS.DONATE,
        PERMISSIONS.SERVICE_VIEW,
        PERMISSIONS.EVENT_VIEW,
        PERMISSIONS.FEEDBACK_SUBMIT,
        PERMISSIONS.NAVIGATOR_PORATL_ACCESS,
        PERMISSIONS.FLORIZEL_BOOKING,
        PERMISSIONS.CHILDMINDING_ACCESS,
        PERMISSIONS.EVENT_CREATE_EXTERNAL,
        PERMISSIONS.PMS_BOOKING,
        PERMISSIONS.SPACE_BOOKING,
    ],

    hub:[
        PERMISSIONS.DONATE,
        PERMISSIONS.SERVICE_VIEW,
        PERMISSIONS.EVENT_VIEW,
        PERMISSIONS.FEEDBACK_SUBMIT,
        PERMISSIONS.NAVIGATOR_PORATL_ACCESS,
        PERMISSIONS.FLORIZEL_BOOKING,
        PERMISSIONS.CHILDMINDING_ACCESS,
        PERMISSIONS.EVENT_CREATE_EXTERNAL,
        PERMISSIONS.PMS_BOOKING,
        PERMISSIONS.SPACE_BOOKING,
        PERMISSIONS.EVENT_CREATE_INTERNAL,
        PERMISSIONS.APPOINTMENT_APPROVE,
    ],

    manager:[
        PERMISSIONS.DONATE,
        PERMISSIONS.SERVICE_VIEW,
        PERMISSIONS.EVENT_VIEW,
        PERMISSIONS.FEEDBACK_SUBMIT,
        PERMISSIONS.NAVIGATOR_PORATL_ACCESS,
        PERMISSIONS.FLORIZEL_BOOKING,
        PERMISSIONS.CHILDMINDING_ACCESS,
        PERMISSIONS.EVENT_CREATE_EXTERNAL,
        PERMISSIONS.PMS_BOOKING,
        PERMISSIONS.SPACE_BOOKING,
        PERMISSIONS.EVENT_CREATE_INTERNAL,
        PERMISSIONS.APPOINTMENT_APPROVE,
        PERMISSIONS.SPACE_BOOKING_APPROVE,
        PERMISSIONS.FEEDBACK_VIEW,
    ],

    staff:[
        PERMISSIONS.DONATE,
        PERMISSIONS.SERVICE_VIEW,
        PERMISSIONS.EVENT_VIEW,
        PERMISSIONS.FEEDBACK_SUBMIT,
        PERMISSIONS.NAVIGATOR_PORATL_ACCESS,
        PERMISSIONS.FLORIZEL_BOOKING,
        PERMISSIONS.CHILDMINDING_ACCESS,
        PERMISSIONS.EVENT_CREATE_EXTERNAL,
        PERMISSIONS.PMS_BOOKING,
        PERMISSIONS.SPACE_BOOKING,
        PERMISSIONS.EVENT_CREATE_INTERNAL,
        PERMISSIONS.APPOINTMENT_APPROVE,
        PERMISSIONS.SPACE_BOOKING_APPROVE,
        PERMISSIONS.NAVIGATOR_PORTAL_VIEW,
    ],

    admin: ['*'], // Admin has all permissions
}