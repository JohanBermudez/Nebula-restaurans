import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { reservations } from '../data/mockData';

const Reservations: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get day of month for calendar
  const getDayOfMonth = (date: Date) => {
    return date.getDate();
  };
  
  // Generate week days for the calendar view
  const generateWeekDays = (date: Date) => {
    const result = [];
    const day = new Date(date);
    day.setDate(day.getDate() - 3); // Start 3 days before
    
    for (let i = 0; i < 7; i++) {
      result.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    
    return result;
  };
  
  const weekDays = generateWeekDays(selectedDate);
  
  // Get short day name
  const getDayName = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };
  
  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if date is selected
  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Navigate to previous/next week
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };
  
  // Filter reservations for selected date
  const filteredReservations = reservations.filter((reservation) => {
    const matchesDate = reservation.date === selectedDate.toISOString().split('T')[0];
    
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reservation.customerPhone.includes(searchTerm) ||
                          reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesDate && matchesSearch && matchesStatus;
  });
  
  // Sort reservations by time
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get source badge
  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'ai_agent':
        return <Badge variant="primary">AI Agent</Badge>;
      case 'website':
        return <Badge variant="secondary">Website</Badge>;
      case 'manual':
        return <Badge variant="default">Manual</Badge>;
      default:
        return <Badge>{source}</Badge>;
    }
  };

  return (
    <Layout isSuperAdmin={false}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Reservations</h1>
          <p className="text-text-light">Manage your restaurant's reservations</p>
        </div>
        <Button leftIcon={<Plus size={18} />}>New Reservation</Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ChevronLeft size={16} />}
              onClick={() => navigateWeek('prev')}
            >
              Previous Week
            </Button>
            <h3 className="text-lg font-medium text-text-dark">
              {formatDate(selectedDate)}
            </h3>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronRight size={16} />}
              onClick={() => navigateWeek('next')}
            >
              Next Week
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(new Date(day))}
                className={`
                  flex flex-col items-center p-3 rounded-md cursor-pointer transition-colors
                  ${isSelected(day)
                    ? 'bg-primary text-white'
                    : isToday(day)
                    ? 'bg-primary-light/10 text-primary'
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-sm font-medium">{getDayName(day)}</span>
                <span className={`text-2xl font-semibold mt-1 ${isSelected(day) ? 'text-white' : 'text-text-dark'}`}>
                  {getDayOfMonth(day)}
                </span>
                <span className="text-xs mt-1">
                  {reservations.filter(r => r.date === day.toISOString().split('T')[0]).length} reservations
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Reservations for {formatDate(selectedDate)}</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {sortedReservations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-text-light">No reservations found for this date</p>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    className="mt-2"
                  >
                    Add Reservation
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {sortedReservations.map((reservation) => (
                    <div key={reservation.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-text-dark">{reservation.customerName}</h3>
                            <div className="ml-2">
                              {getStatusBadge(reservation.status)}
                            </div>
                            <div className="ml-2">
                              {getSourceBadge(reservation.source)}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-text-light mt-1">
                            <Clock size={14} className="mr-1" />
                            <span>{reservation.time}</span>
                            <span className="mx-2">•</span>
                            <Users size={14} className="mr-1" />
                            <span>{reservation.partySize} guests</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-text-light">Contact</p>
                          <p>{reservation.customerPhone}</p>
                          <p>{reservation.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-text-light">Notes</p>
                          <p>{reservation.notes || 'No special requests'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-text-light">Total</p>
                    <p className="text-xl font-semibold text-text-dark">{sortedReservations.length}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-text-light">Guests</p>
                    <p className="text-xl font-semibold text-text-dark">
                      {sortedReservations.reduce((sum, res) => sum + res.partySize, 0)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-text-dark mb-2">Status Breakdown</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Confirmed</span>
                        <span>
                          {sortedReservations.filter(r => r.status === 'confirmed').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.status === 'confirmed').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Pending</span>
                        <span>
                          {sortedReservations.filter(r => r.status === 'pending').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.status === 'pending').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Cancelled</span>
                        <span>
                          {sortedReservations.filter(r => r.status === 'cancelled').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-red-500 h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.status === 'cancelled').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-text-dark mb-2">Source Breakdown</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>AI Agent</span>
                        <span>
                          {sortedReservations.filter(r => r.source === 'ai_agent').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.source === 'ai_agent').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Website</span>
                        <span>
                          {sortedReservations.filter(r => r.source === 'website').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-secondary h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.source === 'website').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Manual</span>
                        <span>
                          {sortedReservations.filter(r => r.source === 'manual').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-gray-500 h-1.5 rounded-full"
                          style={{
                            width: `${sortedReservations.length ? (sortedReservations.filter(r => r.source === 'manual').length / sortedReservations.length * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" leftIcon={<Plus size={16} />}>
                  Add New Reservation
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<CalendarIcon size={16} />}>
                  View Full Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Users size={16} />}>
                  Manage Table Layout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reservations;
