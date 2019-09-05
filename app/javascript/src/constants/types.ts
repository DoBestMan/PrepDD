export interface NotificationType {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface ListType {
  name: string;
  description: string;
  requesterId: string;
  responderId: string;
  isTemplate: boolean;
  isPublicTemplate: boolean;
}