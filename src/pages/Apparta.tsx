import React, { useState } from 'react';
import { Link, RefreshCw, Check, X, Settings, ExternalLink, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { restaurants } from '../data/mockData';

const Apparta: React.FC = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0].id);
  
  // Mock data for Apparta integrations
  const integrations = [
    {
      restaurantId: '1',
      connected: true,
      apiKey: '••••••••••••••••',
      lastSync: '2023-07-15T10:30:00Z',
      syncStatus: 'success',
      features: {
        reservations: true,
        menu: true,
        customers: true,
      },
      syncFrequency: 15, // minutes
    },
    {
      restaurantId: '2',
      connected: true,
      apiKey: '••••••••••••••••',
      lastSync: '2023-07-15T09:45:00Z',
      syncStatus: 'warning',
      features: {
        reservations: true,
        menu: true,
        customers: false,
      },
      syncFrequency: 30,
    },
    {
      restaurantId: '3',
      connected: false,
      apiKey: '',
      lastSync: null,
      syncStatus: 'not_connected',
      features: {
        reservations: false,
        menu: false,
        customers: false,
      },
      syncFrequency: 60,
    },
    {
      restaurantId: '4',
      connected: true,
      apiKey: '••••••••••••••••',
      lastSync: '2023-07-15T08:15:00Z',
      syncStatus: 'error',
      features: {
        reservations: true,
        menu: true,
        customers: true,
      },
      syncFrequency: 15,
    },
    {
      restaurantId: '5',
      connected: false,
      apiKey: '',
      lastSync: null,
      syncStatus: 'not_connected',
      features: {
        reservations: false,
        menu: false,
        customers: false,
      },
      syncFrequency: 60,
    },
  ];

  const currentIntegration = integrations.find(i => i.restaurantId === selectedRestaurant) || integrations[0];
  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurant) || restaurants[0];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Synced</Badge>;
      case 'warning':
        return <Badge variant="warning">Partial Sync</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      case 'not_connected':
        return <Badge variant="default">Not Connected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Apparta Integration</h1>
        <p className="text-text-light">Manage Apparta TuMesa connections for restaurants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Integration Status</CardTitle>
                <select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                >
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {currentRestaurant.logo ? (
                    <img
                      src={currentRestaurant.logo}
                      alt={currentRestaurant.name}
                      className="w-12 h-12 rounded-md object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold mr-4">
                      {currentRestaurant.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-text-dark">{currentRestaurant.name}</h3>
                    <p className="text-sm text-text-light">{currentRestaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    currentIntegration.connected ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {currentIntegration.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>

              {currentIntegration.connected ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-text-light">Last Sync</p>
                      <div className="flex items-center mt-1">
                        <p className="text-lg font-medium text-text-dark">
                          {formatDate(currentIntegration.lastSync)}
                        </p>
                        <div className="ml-2">
                          {getSyncStatusBadge(currentIntegration.syncStatus)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-text-light">Sync Frequency</p>
                      <p className="text-lg font-medium text-text-dark mt-1">
                        Every {currentIntegration.syncFrequency} minutes
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-text-light">API Key</p>
                      <div className="flex items-center mt-1">
                        <p className="text-lg font-medium text-text-dark">
                          {currentIntegration.apiKey}
                        </p>
                        <button className="ml-2 text-text-light hover:text-text-dark">
                          <Link size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-text-dark mb-3">Enabled Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          currentIntegration.features.reservations
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {currentIntegration.features.reservations ? <Check size={14} /> : <X size={14} />}
                        </div>
                        <span className="text-sm font-medium">Reservations</span>
                      </div>
                      <div className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          currentIntegration.features.menu
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {currentIntegration.features.menu ? <Check size={14} /> : <X size={14} />}
                        </div>
                        <span className="text-sm font-medium">Menu</span>
                      </div>
                      <div className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          currentIntegration.features.customers
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {currentIntegration.features.customers ? <Check size={14} /> : <X size={14} />}
                        </div>
                        <span className="text-sm font-medium">Customers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      leftIcon={<RefreshCw size={16} />}
                    >
                      Sync Now
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        leftIcon={<Settings size={16} />}
                      >
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        leftIcon={<ExternalLink size={16} />}
                      >
                        Open Apparta
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-text-light">
                    This restaurant is not connected to Apparta TuMesa. Connect it to enable reservations, menu synchronization, and customer data integration.
                  </p>
                  
                  <div className="space-y-4 border border-gray-200 rounded-md p-4">
                    <Input
                      label="Apparta API Key"
                      placeholder="Enter your Apparta TuMesa API key"
                    />
                    <Input
                      label="Restaurant ID"
                      placeholder="Enter your Apparta restaurant ID"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="accept-terms"
                        className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                      />
                      <label htmlFor="accept-terms" className="ml-2 text-sm text-text-light">
                        I authorize Nebula to access my Apparta TuMesa account data
                      </label>
                    </div>
                    <Button>
                      Connect to Apparta
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
            </CardHeader>
            <CardContent>
              {currentIntegration.connected ? (
                <div className="space-y-3">
                  <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">Successful sync</p>
                      <p className="text-xs text-green-700">Today, 10:30 AM</p>
                    </div>
                    <p className="text-xs text-green-700">
                      Synced 24 menu items, 18 reservations, 45 customers
                    </p>
                  </div>
                  <div className="flex items-center p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">Partial sync</p>
                      <p className="text-xs text-yellow-700">Today, 9:45 AM</p>
                    </div>
                    <p className="text-xs text-yellow-700">
                      Synced 24 menu items, 15 reservations, customer sync failed
                    </p>
                  </div>
                  <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">Successful sync</p>
                      <p className="text-xs text-green-700">Yesterday, 4:15 PM</p>
                    </div>
                    <p className="text-xs text-green-700">
                      Synced 24 menu items, 12 reservations, 40 customers
                    </p>
                  </div>
                  <div className="flex items-center p-3 border-l-4 border-red-500 bg-red-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">Sync failed</p>
                      <p className="text-xs text-red-700">Yesterday, 2:30 PM</p>
                    </div>
                    <p className="text-xs text-red-700">
                      API connection timeout
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-text-light text-center py-4">
                  No sync history available. Connect to Apparta to start syncing data.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restaurants.map((restaurant) => {
                  const integration = integrations.find(i => i.restaurantId === restaurant.id);
                  if (!integration) return null;
                  
                  return (
                    <div
                      key={restaurant.id}
                      className={`p-3 border rounded-md ${
                        selectedRestaurant === restaurant.id
                          ? 'border-primary bg-primary-light/10'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {restaurant.logo ? (
                            <img
                              src={restaurant.logo}
                              alt={restaurant.name}
                              className="w-8 h-8 rounded-md object-cover mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold mr-3">
                              {restaurant.name.charAt(0)}
                            </div>
                          )}
                          <span className="font-medium text-sm">{restaurant.name}</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            integration.connected ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          {getSyncStatusBadge(integration.syncStatus)}
                        </div>
                      </div>
                      
                      {integration.connected && (
                        <div className="mt-2 text-xs text-text-light flex justify-between">
                          <span>Last sync: {formatDate(integration.lastSync)}</span>
                          <button
                            className="text-primary hover:text-primary-dark"
                            onClick={() => setSelectedRestaurant(restaurant.id)}
                          >
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Apparta Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-text-dark">Integration Guide</h3>
                  <p className="text-sm text-text-light mt-1">
                    Learn how to set up and configure the Apparta TuMesa integration
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-text-dark">API Documentation</h3>
                  <p className="text-sm text-text-light mt-1">
                    Technical details about the Apparta API endpoints and data models
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-text-dark">Troubleshooting</h3>
                  <p className="text-sm text-text-light mt-1">
                    Common issues and solutions for Apparta integration
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Apparta;
