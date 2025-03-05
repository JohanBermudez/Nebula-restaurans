import React from 'react';
import { BarChart3, MessageSquare, Users, TrendingUp, Store } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ActivityChart from '../components/dashboard/ActivityChart';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { restaurants } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversations',
        data: [65, 78, 52, 91, 83, 56, 89],
        borderColor: '#1E3A8A',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        fill: true,
      },
      {
        label: 'Reservations',
        data: [28, 35, 19, 43, 37, 25, 41],
        borderColor: '#7E22CE',
        backgroundColor: 'rgba(126, 34, 206, 0.1)',
        fill: true,
      },
    ],
  };

  const restaurantActivityData = {
    labels: restaurants.slice(0, 5).map(r => r.name),
    datasets: [
      {
        label: 'Interactions',
        data: restaurants.slice(0, 5).map(r => r.totalInteractions),
        backgroundColor: '#1E3A8A',
      },
      {
        label: 'Resolution Rate (%)',
        data: restaurants.slice(0, 5).map(r => r.resolutionRate * 100),
        backgroundColor: '#7E22CE',
      },
    ],
  };

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Dashboard</h1>
        <p className="text-text-light">Overview of all restaurant activities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Restaurants"
          value={restaurants.length}
          icon={<Store size={24} />}
          change={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Interactions"
          value="4,523"
          icon={<MessageSquare size={24} />}
          change={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="1,254"
          icon={<Users size={24} />}
          change={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Avg. Resolution Rate"
          value="85.7%"
          icon={<TrendingUp size={24} />}
          change={{ value: 2.3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ActivityChart
          title="Activity Overview"
          data={activityData}
          className="lg:col-span-2"
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Top Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurants.slice(0, 5).map((restaurant) => (
                <div key={restaurant.id} className="flex items-center">
                  {restaurant.logo ? (
                    <img
                      src={restaurant.logo}
                      alt={restaurant.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold">
                      {restaurant.name.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-text-dark">{restaurant.name}</p>
                      <p className="text-sm font-medium text-text-dark">
                        {restaurant.totalInteractions.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${(restaurant.resolutionRate * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-text-light">Resolution Rate</p>
                      <p className="text-xs font-medium text-text-dark">
                        {(restaurant.resolutionRate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                <p className="text-sm font-medium text-red-800">High volume alert: La Trattoria</p>
                <p className="text-xs text-red-700 mt-1">Unusual spike in conversation volume detected</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                <p className="text-sm font-medium text-yellow-800">Low resolution rate: Burger House</p>
                <p className="text-xs text-yellow-700 mt-1">Resolution rate dropped below 70% threshold</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <p className="text-sm font-medium text-blue-800">New restaurant onboarded: Taco Loco</p>
                <p className="text-xs text-blue-700 mt-1">Setup completed, pending final configuration</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-text-dark">AI Agent Service</p>
                </div>
                <p className="text-sm text-green-600 font-medium">Operational</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-text-dark">N8N Workflow Engine</p>
                </div>
                <p className="text-sm text-green-600 font-medium">Operational</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-text-dark">Apparta Integration</p>
                </div>
                <p className="text-sm text-green-600 font-medium">Operational</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <p className="text-sm text-text-dark">WhatsApp Channel</p>
                </div>
                <p className="text-sm text-yellow-600 font-medium">Degraded Performance</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-text-dark">Facebook Channel</p>
                </div>
                <p className="text-sm text-green-600 font-medium">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
