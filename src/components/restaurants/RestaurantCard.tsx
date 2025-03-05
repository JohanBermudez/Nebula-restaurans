import React from 'react';
import { ExternalLink, MessageSquare, Check, X } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onView: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onView }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="error">Inactive</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-primary to-secondary rounded-t-card">
          <div className="absolute -bottom-8 left-4">
            {restaurant.logo ? (
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-16 h-16 rounded-md border-2 border-white bg-white object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-md border-2 border-white bg-white flex items-center justify-center text-primary font-bold text-xl">
                {restaurant.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-10 px-4 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-text-dark">{restaurant.name}</h3>
              <p className="text-sm text-text-light">{restaurant.address}</p>
            </div>
            {getStatusBadge(restaurant.status)}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-text-light">Created</p>
              <p className="font-medium">{formatDate(restaurant.createdAt)}</p>
            </div>
            <div>
              <p className="text-text-light">Interactions</p>
              <p className="font-medium">{restaurant.totalInteractions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-text-light">Resolution Rate</p>
              <p className="font-medium">{(restaurant.resolutionRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-text-light">Channels</p>
              <div className="flex space-x-1 mt-1">
                {Object.entries(restaurant.channels).map(([channel, isActive]) => (
                  isActive ? (
                    <span key={channel} className="text-green-600" title={`${channel} active`}>
                      <Check size={16} />
                    </span>
                  ) : (
                    <span key={channel} className="text-red-400" title={`${channel} inactive`}>
                      <X size={16} />
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-text-light">
              <MessageSquare size={16} className="mr-1" />
              <span>{restaurant.totalInteractions} interactions</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ExternalLink size={14} />}
              onClick={() => onView(restaurant.id)}
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
