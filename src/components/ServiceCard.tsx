import React from 'react';
import { Clock, TrendingUp, Zap, CheckCircle, XCircle, AlertTriangle, Wrench } from 'lucide-react';
import UptimeChart from './UptimeChart';
import { Service, ServiceStatus } from '../types/service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-5 h-5 text-status-up" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-status-down" />;
      case 'partial':
        return <AlertTriangle className="w-5 h-5 text-status-partial" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-status-maintenance" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'up':
        return 'Operational';
      case 'down':
        return 'Outage';
      case 'partial':
        return 'Degraded';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const getStatusBadgeClass = (status: ServiceStatus) => {
    switch (status) {
      case 'up':
        return 'status-up';
      case 'down':
        return 'status-down';
      case 'partial':
        return 'status-partial';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return 'status-up';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(2)}%`;
  };

  return (
    <div className="service-card group">
      {/* Service Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {service.name}
          </h3>
        </div>
        
        <div className={`status-badge ${getStatusBadgeClass(service.status)}`}>
          {getStatusIcon(service.status)}
          <span className="ml-1">{getStatusText(service.status)}</span>
        </div>
      </div>

      {/* Uptime Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">24h Uptime</span>
          <span className="text-sm font-medium text-card-foreground">
            {formatUptime(service.uptime)}
          </span>
        </div>
        <UptimeChart data={service.uptimeHistory} />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Uptime</div>
            <div className="text-sm font-medium text-card-foreground">
              {formatUptime(service.uptime)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Response</div>
            <div className="text-sm font-medium text-card-foreground">
              {service.responseTime}ms
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-card-border pt-3">
        <Clock className="w-3 h-3" />
        <span>Updated {formatTime(service.lastUpdated)}</span>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;