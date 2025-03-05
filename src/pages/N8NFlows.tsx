import React, { useState } from 'react';
import { Link, ExternalLink, Play, Pause, RefreshCw, Plus, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { restaurants } from '../data/mockData';

const N8NFlows: React.FC = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for N8N flows
  const flows = [
    {
      id: '1',
      name: 'WhatsApp Integration',
      description: 'Connects WhatsApp Business API with the AI agent',
      status: 'active',
      lastUpdated: '2023-07-10T14:30:00Z',
      restaurantId: '1',
      webhook: 'https://n8n.nebula.ai/webhook/whatsapp-la-trattoria',
      channels: ['whatsapp'],
    },
    {
      id: '2',
      name: 'Facebook Messenger',
      description: 'Handles Facebook Messenger conversations',
      status: 'active',
      lastUpdated: '2023-07-12T09:15:00Z',
      restaurantId: '1',
      webhook: 'https://n8n.nebula.ai/webhook/facebook-la-trattoria',
      channels: ['facebook'],
    },
    {
      id: '3',
      name: 'Reservation Notifications',
      description: 'Sends email notifications for new reservations',
      status: 'active',
      lastUpdated: '2023-07-08T16:45:00Z',
      restaurantId: '1',
      webhook: 'https://n8n.nebula.ai/webhook/reservations-la-trattoria',
      channels: ['email'],
    },
    {
      id: '4',
      name: 'WhatsApp Integration',
      description: 'Connects WhatsApp Business API with the AI agent',
      status: 'active',
      lastUpdated: '2023-07-11T10:20:00Z',
      restaurantId: '2',
      webhook: 'https://n8n.nebula.ai/webhook/whatsapp-sushi-sakura',
      channels: ['whatsapp'],
    },
    {
      id: '5',
      name: 'Instagram DM Handler',
      description: 'Processes Instagram direct messages',
      status: 'inactive',
      lastUpdated: '2023-07-05T11:30:00Z',
      restaurantId: '2',
      webhook: 'https://n8n.nebula.ai/webhook/instagram-sushi-sakura',
      channels: ['instagram'],
    },
    {
      id: '6',
      name: 'Apparta Integration',
      description: 'Connects with Apparta TuMesa for reservations',
      status: 'error',
      lastUpdated: '2023-07-13T08:45:00Z',
      restaurantId: '1',
      webhook: 'https://n8n.nebula.ai/webhook/apparta-la-trattoria',
      channels: ['api'],
    },
  ];

  const filteredFlows = flows.filter((flow) => {
    const matchesRestaurant = selectedRestaurant === 'all' || flow.restaurantId === selectedRestaurant;
    const matchesStatus = statusFilter === 'all' || flow.status === statusFilter;
    return matchesRestaurant && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="default">Inactive</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return '📱';
      case 'facebook':
        return '👤';
      case 'instagram':
        return '📷';
      case 'email':
        return '📧';
      case 'api':
        return '🔌';
      default:
        return '🔗';
    }
  };

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">N8N Flows</h1>
        <p className="text-text-light">Manage integration flows for restaurant agents</p>
      </div>

      <div className="bg-white rounded-card shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
            >
              <option value="all">All Restaurants</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
          
          <Button leftIcon={<Plus size={18} />}>
            Create Flow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow) => {
          const restaurant = restaurants.find(r => r.id === flow.restaurantId);
          
          return (
            <Card key={flow.id} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{flow.name}</CardTitle>
                    <p className="text-sm text-text-light mt-1">{flow.description}</p>
                  </div>
                  {getStatusBadge(flow.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-light">Restaurant</p>
                    <p className="text-sm font-medium">{restaurant?.name || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-light">Webhook URL</p>
                    <div className="flex items-center mt-1">
                      <code className="text-xs bg-gray-100 p-1 rounded flex-1 truncate">
                        {flow.webhook}
                      </code>
                      <button className="ml-2 text-text-light hover:text-text-dark">
                        <Link size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-light">Channels</p>
                    <div className="flex mt-1 space-x-2">
                      {flow.channels.map((channel, index) => (
                        <span key={index} className="text-lg" title={channel}>
                          {getChannelIcon(channel)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-light">Last Updated</p>
                    <p className="text-sm">{formatDate(flow.lastUpdated)}</p>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={flow.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                    >
                      {flow.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<RefreshCw size={14} />}
                      >
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<ExternalLink size={14} />}
                      >
                        Edit in N8N
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default N8NFlows;
