import React, { useState } from 'react';
import { Bell, Calendar, Filter, Plus, Search, Send, Clock, BarChart2, Copy, Edit, Eye, Trash2, Link } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

// Mock notification campaigns data for the restaurant
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
    openRate: null,
    clickRate: null,
  },
];

// Mock deep links data for the restaurant
const deepLinks = [
  {
    id: '1',
    url: 'nebula://restaurant/1/promo/weekend-special',
    type: 'promotion',
    params: { promoId: 'weekend-special', discount: '20%' },
    createdAt: '2023-07-08T14:30:00Z',
    usageCount: 145,
  },
  {
    id: '2',
    url: 'nebula://restaurant/1/menu/new-items',
    type: 'menu',
    params: { section: 'new-items' },
    createdAt: '2023-07-15T11:20:00Z',
    usageCount: 78,
  },
  {
    id: '3',
    url: 'nebula://restaurant/1/promo/happy-hour',
    type: 'promotion',
    params: { promoId: 'happy-hour', time: '4pm-8pm' },
    createdAt: '2023-07-12T09:45:00Z',
    usageCount: 0,
  },
];

const RestaurantNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateDeepLink, setShowCreateDeepLink] = useState(false);
  
  // Filter campaigns based on selected filters
  const filteredCampaigns = notificationCampaigns.filter((campaign) => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Filter deep links based on search
  const filteredDeepLinks = deepLinks.filter((link) => {
    const matchesSearch = link.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          link.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
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
    <Layout isSuperAdmin={false}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Notification Center</h1>
        <p className="text-text-light">Manage push notifications for your restaurant</p>
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
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-light hover:text-text-dark hover:border-gray-300'
                  }`}
                >
                  <BarChart2 size={16} className="mr-2" />
                  Analytics
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
                        {filteredCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-text-dark">{campaign.title}</div>
                                <div className="text-xs text-text-light truncate max-w-xs">{campaign.message}</div>
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
                        ))}
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
                        {filteredDeepLinks.map((link) => (
                          <tr key={link.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-mono text-text-dark truncate max-w-xs">{link.url}</div>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-text-light">Performance chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement by Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                              Campaign
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                              Sent
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                              Delivered
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                              Opened
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                              Clicked
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {notificationCampaigns.filter(c => c.status === 'sent').map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-text-dark">{campaign.title}</div>
                                <div className="text-xs text-text-light">{formatDate(campaign.sentAt)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                                1,245
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                                1,230
                                <span className="text-xs text-text-light ml-1">(98.8%)</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                                {Math.round(1230 * campaign.openRate!)}
                                <span className="text-xs text-text-light ml-1">({(campaign.openRate! * 100).toFixed(1)}%)</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-dark">
                                {Math.round(1230 * campaign.clickRate!)}
                                <span className="text-xs text-text-light ml-1">({(campaign.clickRate! * 100).toFixed(1)}%)</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-text-dark">Average Open Rate</p>
                          <p className="text-sm font-medium text-text-dark">42.5%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '42.5%' }}></div>
                        </div>
                        <p className="text-xs text-text-light mt-1">Industry average: 35.2%</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-text-dark">Average Click Rate</p>
                          <p className="text-sm font-medium text-text-dark">18.3%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full" style={{ width: '18.3%' }}></div>
                        </div>
                        <p className="text-xs text-text-light mt-1">Industry average: 12.7%</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-text-dark">Conversion Rate</p>
                          <p className="text-sm font-medium text-text-dark">8.2%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: '8.2%' }}></div>
                        </div>
                        <p className="text-xs text-text-light mt-1">Industry average: 5.4%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Best Performing Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-light/10 flex items-center justify-center text-primary">
                            <Calendar size={16} />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-text-dark">Day of Week</p>
                            <p className="text-xs text-text-light">Thursday</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-text-dark">48.7% open rate</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-light/10 flex items-center justify-center text-primary">
                            <Clock size={16} />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-text-dark">Time of Day</p>
                            <p className="text-xs text-text-light">6:00 PM - 8:00 PM</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-text-dark">52.3% open rate</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-light/10 flex items-center justify-center text-primary">
                            <Bell size={16} />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-text-dark">Best Campaign Type</p>
                            <p className="text-xs text-text-light">Special Offers</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-text-dark">24.5% click rate</span>
                      </div>
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

export default RestaurantNotifications;
