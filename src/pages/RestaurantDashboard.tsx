import React from 'react';
import { MessageSquare, Calendar, TrendingUp, Star } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ActivityChart from '../components/dashboard/ActivityChart';
import ConversationList from '../components/conversations/ConversationList';
import Button from '../components/ui/Button';
import { conversations, metrics } from '../data/mockData';

const RestaurantDashboard: React.FC = () => {
  // Mock data for charts
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversations',
        data: [25, 32, 18, 36, 29, 24, 33],
        borderColor: '#1E3A8A',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
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

  const restaurantId = '1'; // Assuming we're viewing La Trattoria
  const restaurantMetrics = metrics[restaurantId]?.[0] || {
    conversations: 0,
    resolutionRate: 0,
    reservations: 0,
    satisfaction: 0,
  };

  const restaurantConversations = conversations.filter(
    (conv) => conv.restaurantId === restaurantId
  );

  return (
    <Layout isSuperAdmin={false}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Restaurant Dashboard</h1>
        <p className="text-text-light">Overview of your restaurant's AI agent activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Today's Conversations"
          value={restaurantMetrics.conversations}
          icon={<MessageSquare size={24} />}
          change={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Resolution Rate"
          value={`${(restaurantMetrics.resolutionRate * 100).toFixed(1)}%`}
          icon={<TrendingUp size={24} />}
          change={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Today's Reservations"
          value={restaurantMetrics.reservations}
          icon={<Calendar size={24} />}
          change={{ value: 15.4, isPositive: true }}
        />
        <StatCard
          title="Customer Satisfaction"
          value={restaurantMetrics.satisfaction.toFixed(1)}
          icon={<Star size={24} />}
          change={{ value: 0.2, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ActivityChart
          title="Conversation Activity"
          data={activityData}
          className="lg:col-span-2"
        />
        
        <div className="bg-white rounded-card shadow-card p-6">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Top Topics</h3>
          <div className="space-y-4">
            {restaurantMetrics.topTopics?.map((topic, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-text-dark">{topic.topic}</span>
                  <span className="text-sm text-text-light">{topic.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{
                      width: `${(topic.count / Math.max(...restaurantMetrics.topTopics.map(t => t.count)) * 100).toFixed(0)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConversationList
            conversations={restaurantConversations}
            onSelect={(id) => console.log('Selected conversation:', id)}
          />
        </div>
        
        <div className="bg-white rounded-card shadow-card p-6">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" leftIcon={<Calendar size={18} />}>
              View Reservations
            </Button>
            <Button variant="outline" className="w-full justify-start" leftIcon={<MessageSquare size={18} />}>
              View All Conversations
            </Button>
            <Button variant="outline" className="w-full justify-start" leftIcon={<Star size={18} />}>
              View Customer Feedback
            </Button>
          </div>
          
          <h3 className="text-lg font-semibold text-text-dark mt-6 mb-4">Agent Status</h3>
          <div className="p-4 bg-green-50 rounded-md border border-green-200">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm font-medium text-green-800">AI Agent is active</p>
            </div>
            <p className="text-xs text-green-700 mt-1">All channels are operational</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantDashboard;
