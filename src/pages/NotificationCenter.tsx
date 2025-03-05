import React, { useState } from 'react';
import { Bell, Calendar, Filter, Plus, Search, Send, Clock, BarChart2, Settings, Trash2, Copy, Edit, Eye } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { restaurants } from '../data/mockData';

// Mock notification campaigns data
const notificationCampaigns = [
  {
    id: '1',
    title: 'Weekend Special Offer',
    message: 'Join us this weekend for a special 20% discount on all main courses!',
    status: 'sent',
    scheduledFor: '2023-07-10T18:00:00Z',
    sentAt: '2023-07-10T18:00:00Z',
    audience: 'all_customers',
    deepLink: 'nebula://restaurant/1/promo/weekend-special',
    restaurantId: '1',
    openRate: 0.42,
    clickRate: 0.18,
  },
  {
    id: '2',
    title: 'New Menu Items',
    message: 'We\'ve added 5 exciting new dishes to our menu. Come try them out!',
    status: 'scheduled',
    scheduledFor: '2023-07-20T17:00:00Z',
    sentAt: null,
    audience: 'previous_customers',
    deepLink: 'nebula://restaurant/1/menu/new-items',
    restaurantId: '1',
    openRate: null,
    clickRate: null,
  },
  {
    id: '3',
    title: 'Happy Hour Extended',
    message: 'Our popular happy hour is now extended until 8pm every weekday!',
    status: 'draft',
    scheduledFor: null,
    sentAt: null,
    audience: 'all_customers',
    deepLink: 'nebula://restaurant/1/promo/happy-hour',
    restaurantId: '1',
    openRate: null,
    clickRate: null,
  },
  {
    id: '4',
    title: 'Sushi Tuesday',
    message: 'All sushi rolls at 30% off every Tuesday. Reserve your table now!',
    status: 'sent',
    scheduledFor: '2023-07-05T10:00:00Z',
    sentAt: '2023-07-05T10:00:00Z',
    audience: 'all_customers',
    deepLink: 'nebula://restaurant/2/promo/sushi-tuesday',
    restaurantId: '2',
    openRate: 0.38,
    clickRate: 0.22,
  },
  {
    id: '5',
    title: 'Chef\'s Special Weekend',
    message: 'This weekend our chef has prepared a special tasting menu. Limited seats available!',
    status: 'scheduled',
    scheduledFor: '2023-07-22T09:00:00Z',
    sentAt: null,
    audience: 'vip_customers',
    deepLink: 'nebula://restaurant/2/event/chef-special',
    restaurantId: '2',
    openRate: null,
    clickRate: null,
  },
];

// Mock deep links data
const deepLinks = [
  {
    id: '1',
    url: 'nebula://restaurant/1/promo/weekend-special',
    type: 'promotion',
    params: { promoId: 'weekend-special', discount: '20%' },
    createdAt: '2023-07-08T14:30:00Z',
    restaurantId: '1',
    usageCount: 145,
  },
  {
    id: '2',
    url: 'nebula://restaurant/1/menu/new-items',
    type: 'menu',
    params: { section: 'new-items' },
    createdAt: '2023-07-15T11:20:00Z',
    restaurantId: '1',
    usageCount: 78,
  },
  {
    id: '3',
    url: 'nebula://restaurant/1/promo/happy-hour',
    type: 'promotion',
    params: { promoId: 'happy-hour', time: '4pm-8pm' },
    createdAt: '2023-07-12T09:45:00Z',
    restaurantId: '1',
    usageCount: 0,
  },
  {
    id: '4',
    url: 'nebula://restaurant/2/promo/sushi-tuesday',
    type: 'promotion',
    params: { promoId: 'sushi-tuesday', discount: '30%' },
    createdAt: '2023-07-03T16:15:00Z',
    restaurantId: '2',
    usageCount: 203,
  },
  {
    id: '5',
    url: 'nebula://restaurant/2/event/chef-special',
    type: 'event',
    params: { eventId: 'chef-special', date: '2023-07-22' },
    createdAt: '2023-07-18T10:30:00Z',
    restaurantId: '2',
    usageCount: 0,
  },
];

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateDeepLink, setShowCreateDeepLink] = useState(false);
  
  // Filter campaigns based on selected filters
  const filteredCampaigns = notificationCampaigns.filter((campaign) => {
    const matchesRestaurant = selectedRestaurant === 'all' || campaign.restaurantId === selectedRestaurant;
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRestaurant && matchesStatus && matchesSearch;
  });
  
  // Filter deep links based on selected restaurant
  const filteredDeepLinks = deepLinks.filter((link) => {
    const matchesRestaurant = selectedRestaurant === 'all' || link.restaurantId === selectedRestaurant;
    const matchesSearch = link.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          link.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRestaurant && matchesSearch;
  });
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="success">Sent</Badge>;
      case 'scheduled':
        return <Badge variant="primary">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="default">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get audience label
  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'all_customers':
        return 'All Customers';
      case 'previous_customers':
        return 'Previous Customers';
      case 'vip_customers':
        return 'VIP Customers';
      default:
        return audience;
    }
  };
  
  // Create Campaign Form
  const CampaignForm = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Create New Campaign</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCreateCampaign(false)}
          >
            Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            label="Campaign Title"
            placeholder="Enter a title for your notification"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              Notification Message
            </label>
            <textarea
              placeholder="Enter the message content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Target Audience
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              >
                <option value="all_customers">All Customers</option>
                <option value="previous_customers">Previous Customers</option>
                <option value="vip_customers">VIP Customers</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Deep Link
              </label>
              <div className="flex">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                >
                  <option value="">Select a deep link</option>
                  {deepLinks.map((link) => (
                    <option key={link.id} value={link.url}>{link.url}</option>
                  ))}
                </select>
                <Button
                  className="rounded-l-none"
                  onClick={() => {
                    setShowCreateCampaign(false);
                    setShowCreateDeepLink(true);
                  }}
                >
                  Create New
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Schedule Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Schedule Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="send-immediately"
              className="h-4 w-4 text-primary focus:ring-primary-light rounded"
            />
            <label htmlFor="send-immediately" className="ml-2 text-sm text-text-dark">
              Send immediately
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="outline">Save as Draft</Button>
          <div className="space-x-2">
            <Button variant="outline" leftIcon={<Eye size={16} />}>Preview</Button>
            <Button leftIcon={<Send size={16} />}>Schedule Campaign</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
  
  // Create Deep Link Form
  const DeepLinkForm = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Create New Deep Link</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCreateDeepLink(false)}
          >
            Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              Link Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
            >
              <option value="promotion">Promotion</option>
              <option value="menu">Menu</option>
              <option value="event">Event</option>
              <option value="reservation">Reservation</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Identifier"
              placeholder="e.g., promo-id, menu-section, event-name"
              required
            />
            
            <Input
              label="Additional Parameter (Optional)"
              placeholder="e.g., discount=20%, date=2023-07-30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              Generated Deep Link
            </label>
            <div className="flex">
              <input
                type="text"
                value="nebula://restaurant/1/promo/new-promo"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none"
              />
              <Button
                variant="outline"
                className="rounded-l-none"
                leftIcon={<Copy size={16} />}
              >
                Copy
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center p-4 bg-gray-50 rounded-md">
            <div className="w-32 h-32 bg-white border border-gray-300 flex items-center justify-center text-center p-2">
              QR Code will be generated here
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="outline">Reset</Button>
          <div className="space-x-2">
            <Button variant="outline" leftIcon={<Copy size={16} />}>Copy Link</Button>
            <Button>Save Deep Link</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Notification Center</h1>
        <p className="text-text-light">Manage and monitor push notifications for all restaurants</p>
      </div>
      
      {!showCreateCampaign && !showCreateDeepLink && (
        <>
          <div className="bg-white rounded-card shadow-card p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'campaigns' ? 'campaigns' : 'deep links'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
                />
              </div>
              
              <div className="flex gap-2">
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
                
                {activeTab === 'campaigns' && (
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="sent">Sent</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="draft">Draft</option>
                  </select>
                )}
                
                <Button
                  leftIcon={<Plus size={18} />}
                  onClick={() => {
                    if (activeTab === 'campaigns') {
                      setShowCreateCampaign(true);
                    } else {
                      setShowCreateDeepLink(true);
                    }
                  }}
                >
                  Create {activeTab === 'campaigns' ? 'Campaign' : 'Deep Link'}
                </Button>
              </div>
            </div>
            
            <div className="mt-4 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'campaigns'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-light hover:text-text-dark hover:border-gray-300'
                  }`}
                >
                  <Bell size={16} className="mr-2" />
                  Notification Campaigns
                </button>
                <button
                  onClick={() => setActiveTab('deeplinks')}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'deeplinks'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-light hover:text-text-dark hover:border-gray-300'
                  }`}
                >
                  <Link size={16} className="mr-2" />
                  Deep Links
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-light hover:text-text-dark hover:border-gray-300'
                  }`}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {activeTab === 'campaigns' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredCampaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-text-light">No campaigns found matching your criteria</p>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                      className="mt-4"
                      onClick={() => setShowCreateCampaign(true)}
                    >
                      Create Campaign
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Campaign
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Restaurant
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Audience
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Scheduled For
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Performance
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCampaigns.map((campaign) => {
                          const restaurant = restaurants.find(r => r.id === campaign.restaurantId);
                          
                          return (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-text-dark">{campaign.title}</div>
                                  <div className="text-xs text-text-light truncate max-w-xs">{campaign.message}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {restaurant?.logo ? (
                                    <img
                                      src={restaurant.logo}
                                      alt={restaurant.name}
                                      className="w-6 h-6 rounded-md mr-2"
                                    />
                                  ) : (
                                    <div className="w-6 h-6 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold mr-2">
                                      {restaurant?.name.charAt(0) || '?'}
                                    </div>
                                  )}
                                  <span className="text-sm">{restaurant?.name || 'Unknown'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(campaign.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark">
                                {getAudienceLabel(campaign.audience)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                                {formatDate(campaign.scheduledFor)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {campaign.status === 'sent' ? (
                                  <div>
                                    <div className="flex items-center text-xs">
                                      <span className="text-text-dark mr-1">Open rate:</span>
                                      <span className="font-medium">{(campaign.openRate! * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex items-center text-xs mt-1">
                                      <span className="text-text-dark mr-1">Click rate:</span>
                                      <span className="font-medium">{(campaign.clickRate! * 100).toFixed(1)}%</span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-xs text-text-light">Not available</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  {campaign.status === 'draft' && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      leftIcon={<Edit size={14} />}
                                    >
                                      Edit
                                    </Button>
                                  )}
                                  {campaign.status === 'scheduled' && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      leftIcon={<Clock size={14} />}
                                    >
                                      Reschedule
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Copy size={14} />}
                                  >
                                    Duplicate
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Trash2 size={14} />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'deeplinks' && (
            <Card>
              <CardHeader>
                <CardTitle>Deep Links</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredDeepLinks.length === 0 ? (
                  <div className="text-center py-8">
                    <Link size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-text-light">No deep links found matching your criteria</p>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                      className="mt-4"
                      onClick={() => setShowCreateDeepLink(true)}
                    >
                      Create Deep Link
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Deep Link
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Restaurant
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Created
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                            Usage
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDeepLinks.map((link) => {
                          const restaurant = restaurants.find(r => r.id === link.restaurantId);
                          
                          return (
                            <tr key={link.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="text-sm font-mono text-text-dark truncate max-w-xs">{link.url}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {restaurant?.logo ? (
                                    <img
                                      src={restaurant.logo}
                                      alt={restaurant.name}
                                      className="w-6 h-6 rounded-md mr-2"
                                    />
                                  ) : (
                                    <div className="w-6 h-6 rounded-md bg-primary-light/10 flex items-center justify-center text-primary font-bold mr-2">
                                      {restaurant?.name.charAt(0) || '?'}
                                    </div>
                                  )}
                                  <span className="text-sm">{restaurant?.name || 'Unknown'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="secondary" className="capitalize">{link.type}</Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                                {formatDate(link.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark">
                                {link.usageCount} clicks
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Copy size={14} />}
                                  >
                                    Copy
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<BarChart2 size={14} />}
                                  >
                                    Stats
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Trash2 size={14} />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Global Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-text-dark mb-2">Default Notification Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-text-dark">Default Icon</label>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
                                <Bell size={16} />
                              </div>
                              <Button variant="outline" size="sm">Change</Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-text-dark">Allow Restaurants to Override</label>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-text-dark">Default Sound</label>
                            <select
                              className="appearance-none pl-3 pr-8 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            >
                              <option value="default">Default</option>
                              <option value="chime">Chime</option>
                              <option value="bell">Bell</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-text-dark mb-2">Deep Link Configuration</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-text-dark mb-1">Base URL Format</label>
                            <input
                              type="text"
                              defaultValue="nebula://restaurant/{restaurant_id}/{type}/{id}"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            />
                            <p className="text-xs text-text-light mt-1">
                              Use {'{placeholders}'} for dynamic values
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-text-dark">Generate QR Codes Automatically</label>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-text-dark mb-2">Rate Limiting</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-text-dark mb-1">Maximum Notifications Per Day</label>
                            <input
                              type="number"
                              defaultValue={3}
                              min={1}
                              max={10}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            />
                            <p className="text-xs text-text-light mt-1">
                              Limit the number of notifications a restaurant can send to a user per day
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-text-dark mb-1">Minimum Time Between Notifications (hours)</label>
                            <input
                              type="number"
                              defaultValue={4}
                              min={1}
                              max={24}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Firebase Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">
                          Firebase Server Key
                        </label>
                        <input
                          type="password"
                          defaultValue="••••••••••••••••••••••••••••••••••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">
                          Firebase Project ID
                        </label>
                        <input
                          type="text"
                          defaultValue="nebula-platform-12345"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                        />
                      </div>
                      
                      <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r-md">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <p className="text-sm font-medium text-green-800">Firebase connection active</p>
                        </div>
                        <p className="text-xs text-green-700 mt-1">Last verified: 2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2">
                      <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
                        Test Connection
                      </Button>
                      <Button>
                        Save Configuration
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-dark">Create Campaigns</label>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-dark">Create Deep Links</label>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-dark">View Analytics</label>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-dark">Customize Notification Appearance</label>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-dark">Schedule Campaigns</label>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary-light rounded"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <h3 className="font-medium text-text-dark">Special Offer</h3>
                        <p className="text-sm text-text-light mt-1">Template for promotional offers and discounts</p>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <h3 className="font-medium text-text-dark">New Menu Item</h3>
                        <p className="text-sm text-text-light mt-1">Announce new additions to your menu</p>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <h3 className="font-medium text-text-dark">Event Invitation</h3>
                        <p className="text-sm text-text-light mt-1">Invite customers to special events</p>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <h3 className="font-medium text-text-dark">Reservation Reminder</h3>
                        <p className="text-sm text-text-light mt-1">Remind customers about upcoming reservations</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        leftIcon={<Plus size={16} />}
                      >
                        Add Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
      
      {showCreateCampaign && <CampaignForm />}
      {showCreateDeepLink && <DeepLinkForm />}
    </Layout>
  );
};

export default NotificationCenter;
