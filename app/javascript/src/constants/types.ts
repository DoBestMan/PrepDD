export interface NotificationType {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface ListType {
  name: string;
  description: string;
  requesterId: string;
  responderId: string;
}

export interface TaskType {
  name: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  section: string;
  isActive: boolean;
}
