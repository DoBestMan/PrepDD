export const isSuperAdmin = (role: string) => role === 'SuperAdmin';

export const isAdmin = (role: string) => role === 'Admin';

export const isOwner = (role: string) => role === 'Owner';

export const isManager = (role: string) => role === 'Manager';

export const isUser = (role: string) => role === 'User';

export const canBeAdmin = (role: string) => isSuperAdmin(role) || isAdmin(role) || isOwner(role);