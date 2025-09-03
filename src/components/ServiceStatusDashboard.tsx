import React, { useState, useEffect } from 'react';
import { Moon, Sun, Activity, Clock, CheckCircle, XCircle, AlertTriangle, Wrench } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ServiceCard from './ServiceCard';
import { Service, ServiceStatus } from '../types/service';

// Mock data for services
const mockServices: Service[] = [
  {
    id: 'github',
    name: 'GitHub',
    status: 'up',
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    uptime: 99.9,
    responseTime: 145,
    uptimeHistory: [
      99.8, 99.9, 100, 99.7, 99.9, 100, 99.8, 99.9, 100, 99.9,
      99.8, 100, 99.9, 99.7, 100, 99.8, 99.9, 100, 99.9, 99.8,
      100, 99.9, 99.8, 99.9
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    status: 'up',
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    uptime: 99.7,
    responseTime: 89,
    uptimeHistory: [
      99.5, 99.8, 99.9, 99.6, 99.8, 99.9, 99.7, 99.8, 99.9, 99.8,
      99.6, 99.9, 99.8, 99.5, 99.9, 99.7, 99.8, 99.9, 99.8, 99.7,
      99.9, 99.8, 99.6, 99.8
    ]
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    status: 'partial',
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    uptime: 98.2,
    responseTime: 234,
    uptimeHistory: [
      98.1, 98.5, 98.8, 97.9, 98.3, 98.7, 98.0, 98.4, 98.9, 98.2,
      97.8, 98.6, 98.1, 97.7, 98.5, 98.0, 98.3, 98.8, 98.1, 97.9,
      98.4, 98.0, 97.8, 98.2
    ]
  },
  {
    id: 'google',
    name: 'Google Cloud',
    status: 'up',
    lastUpdated: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    uptime: 99.95,
    responseTime: 67,
    uptimeHistory: [
      99.9, 100, 99.8, 99.9, 100, 99.9, 99.8, 100, 99.9, 100,
      99.8, 99.9, 100, 99.9, 99.8, 100, 99.9, 99.8, 100, 99.9,
      99.8, 100, 99.9, 99.95
    ]
  }
];

const ServiceStatusDashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [services, setServices] = useState<Service[]>(mockServices);

  useEffect(() => {
    // Check for system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getOverallStatus = (): ServiceStatus => {
    const downServices = services.filter(service => service.status === 'down');
    const partialServices = services.filter(service => service.status === 'partial');
    
    if (downServices.length > 0) return 'down';
    if (partialServices.length > 0) return 'partial';
    return 'up';
  };

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
        return <Activity className="w-5 h-5" />;
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getStatusIcon(overallStatus)}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Service Status Dashboard
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Realtime monitoring for popular platforms
              </p>
            </div>
            
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="glow-primary"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Overall Status Banner */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-medium status-badge ${
            overallStatus === 'up' ? 'status-up' : 
            overallStatus === 'down' ? 'status-down' : 
            overallStatus === 'partial' ? 'status-partial' : 'status-maintenance'
          }`}>
            {getStatusIcon(overallStatus)}
            <span>
              {overallStatus === 'up' ? 'All Systems Operational' :
               overallStatus === 'down' ? 'System Outage Detected' :
               overallStatus === 'partial' ? 'Partial System Outage' :
               'Maintenance in Progress'}
            </span>
          </div>
        </header>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <p className="text-sm">
            Monitoring status updates every 30 seconds
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ServiceStatusDashboard;