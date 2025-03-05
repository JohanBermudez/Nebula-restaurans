import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-light">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-text-dark">{value}</p>
          
          {change && (
            <div className="mt-1 flex items-center">
              <span
                className={`text-xs font-medium ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="ml-1 text-xs text-text-light">vs last period</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-primary-light/10 text-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
