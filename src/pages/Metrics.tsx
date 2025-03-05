import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ActivityChart from '../components/dashboard/ActivityChart';
import { restaurants } from '../data/mockData';

const Metrics: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([restaurants[0].id]);
  
  // Mock data for charts
  const conversationData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Conversations',
        data: [65, 78, 52, 91, 83, 56, 89],
        borderColor: '#1E3A8A',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        fill: true,
      },
    ],
  };
  
  const resolutionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Resolution Rate (%)',
        data: [85, 82, 88, 79, 86, 90, 87],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };
  
  const channelData = {
    labels: ['WhatsApp', 'Facebook', 'Web', 'Instagram'],
    datasets: [
      {
        label: 'Interactions by Channel',
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#25D366', // WhatsApp green
          '#1877F2', // Facebook blue
          '#0EA5E9', // Web blue
          '#E4405F', // Instagram pink
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const topicsData = {
    labels: ['Reservations', 'Menu Info', 'Hours', 'Special Requests', 'Complaints', 'Other'],
    datasets: [
      {
        label: 'Conversations by Topic',
        data: [35, 25, 15, 10, 8, 7],
        backgroundColor: [
          '#1E3A8A', // Primary
          '#7E22CE', // Secondary
          '#0EA5E9', // Accent
          '#10B981', // Green
          '#F59E0B', // Yellow
          '#6B7280', // Gray
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // Toggle restaurant selection
  const toggleRestaurant = (id: string) => {
    if (selectedRestaurants.includes(id)) {
      if (selectedRestaurants.length > 1) {
        setSelectedRestaurants(selectedRestaurants.filter(r => r !== id));
      }
    } else {
      setSelectedRestaurants([...selectedRestaurants, id]);
    }
  };
  
  // Select all restaurants
  const selectAllRestaurants = () => {
    setSelectedRestaurants(restaurants.map(r => r.id));
  };
  
  // Clear all restaurant selections except one
  const clearRestaurantSelections = () => {
    setSelectedRestaurants([restaurants[0].id]);
  };

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Metrics & Analytics</h1>
        <p className="text-text-light">Comprehensive analytics across all restaurants</p>
      </div>
      
      <div className="bg-white rounded-card shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['day', 'week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  dateRange === range
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
            <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 text-text-light hover:bg-gray-200 flex items-center">
              <Calendar size={14} className="mr-1" />
              Custom
            </button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download size={16} />}
            >
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-text-dark">Filter by Restaurant</h3>
            <div className="flex gap-2 text-xs">
              <button
                onClick={selectAllRestaurants}
                className="text-primary hover:text-primary-dark"
              >
                Select All
              </button>
              <button
                onClick={clearRestaurantSelections}
                className="text-text-light hover:text-text-dark"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => toggleRestaurant(restaurant.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                  selectedRestaurants.includes(restaurant.id)
                    ? 'bg-primary-light/10 text-primary border border-primary-light'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200 border border-transparent'
                }`}
              >
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-4 h-4 rounded-sm mr-2"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-sm bg-primary-light/20 flex items-center justify-center text-primary text-xs font-bold mr-2">
                    {restaurant.name.charAt(0)}
                  </div>
                )}
                {restaurant.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityChart
          title="Conversation Volume"
          data={conversationData}
        />
        <ActivityChart
          title="Resolution Rate"
          data={resolutionData}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Interactions by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ActivityChart
                title=""
                data={channelData}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversation Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ActivityChart
                title=""
                data={topicsData}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Restaurant Performance Comparison</CardTitle>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
            >
              Customize Metrics
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                    Conversations
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                    Resolution Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                    Avg. Response Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                    Reservations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurants.filter(r => selectedRestaurants.includes(r.id)).map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {restaurant.logo ? (
                          <img
                            className="h-8 w-8 rounded-md"
                            src={restaurant.logo}
                            alt={restaurant.name}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold">
                            {restaurant.name.charAt(0)}
                          </div>
                        )}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-text-dark">
                            {restaurant.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark font-medium">
                      {restaurant.totalInteractions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <div className="flex items-center justify-end">
                        <span className={`mr-2 ${
                          restaurant.resolutionRate >= 0.85 ? 'text-green-600' :
                          restaurant.resolutionRate >= 0.75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {(restaurant.resolutionRate * 100).toFixed(1)}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              restaurant.resolutionRate >= 0.85 ? 'bg-green-500' :
                              restaurant.resolutionRate >= 0.75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${restaurant.resolutionRate * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                      {Math.floor(Math.random() * 30) + 10}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                      {(4 + Math.random()).toFixed(1)}/5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                      {Math.floor(Math.random() * 50) + 10}/day
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Metrics;
