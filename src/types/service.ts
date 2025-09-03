export type ServiceStatus = 'up' | 'down' | 'partial' | 'maintenance';

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  lastUpdated: Date;
  uptime: number; // percentage
  responseTime: number; // in milliseconds
  uptimeHistory: number[]; // 24 hours of uptime percentages
}