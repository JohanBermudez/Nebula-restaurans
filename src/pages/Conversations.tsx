import React, { useState } from 'react';
import { Search, Filter, MessageSquare, User, Clock, ArrowRight, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ConversationList from '../components/conversations/ConversationList';
import { conversations } from '../data/mockData';

const Conversations: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  
  // Filter conversations
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conversation.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || conversation.channel === channelFilter;
    
    return matchesSearch && matchesStatus && matchesChannel;
  });
  
  // Get selected conversation
  const currentConversation = conversations.find(c => c.id === selectedConversation);
  
  // Mock messages for the selected conversation
  const mockMessages = selectedConversation ? [
    {
      id: '1',
      sender: 'customer',
      content: 'Hello, I would like to make a reservation for tomorrow night.',
      timestamp: '2023-07-15T18:30:00Z',
    },
    {
      id: '2',
      sender: 'agent',
      content: 'Hi there! I\'d be happy to help you with a reservation. How many people will be in your party, and what time would you prefer?',
      timestamp: '2023-07-15T18:31:00Z',
    },
    {
      id: '3',
      sender: 'customer',
      content: 'We are 4 people and would like to come at 8:00 PM if possible.',
      timestamp: '2023-07-15T18:32:00Z',
    },
    {
      id: '4',
      sender: 'agent',
      content: 'Let me check our availability for tomorrow at 8:00 PM for 4 people...',
      timestamp: '2023-07-15T18:33:00Z',
    },
    {
      id: '5',
      sender: 'agent',
      content: 'Great news! We have a table available for 4 people tomorrow at 8:00 PM. Would you like me to make this reservation for you?',
      timestamp: '2023-07-15T18:33:30Z',
    },
    {
      id: '6',
      sender: 'customer',
      content: 'Yes, please. My name is María García.',
      timestamp: '2023-07-15T18:34:00Z',
    },
    {
      id: '7',
      sender: 'agent',
      content: 'Perfect! I\'ve made a reservation for 4 people tomorrow at 8:00 PM under the name María García. Could I also get a contact number in case the restaurant needs to reach you?',
      timestamp: '2023-07-15T18:35:00Z',
    },
  ] : [];
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };
  
  // Handle take over conversation
  const handleTakeOver = () => {
    // In a real app, this would mark the conversation as taken over by a human
    console.log('Taking over conversation:', selectedConversation);
  };

  return (
    <Layout isSuperAdmin={false}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Conversations</h1>
        <p className="text-text-light">Manage and monitor customer interactions</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white rounded-t-card shadow-card p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="transferred">Transferred</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div className="relative flex-1">
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
                >
                  <option value="all">All Channels</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="facebook">Facebook</option>
                  <option value="web">Web</option>
                  <option value="instagram">Instagram</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-white rounded-b-card shadow-card">
            <ConversationList
              conversations={filteredConversations}
              onSelect={setSelectedConversation}
              selectedId={selectedConversation || undefined}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2 flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              <div className="bg-white rounded-t-card shadow-card p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary font-bold mr-3">
                      {currentConversation.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-text-dark">{currentConversation.customerName}</h3>
                      <div className="flex items-center text-xs text-text-light mt-1">
                        <span className="text-lg mr-1" aria-hidden="true">
                          {currentConversation.channel === 'whatsapp' ? '📱' : 
                           currentConversation.channel === 'facebook' ? '👤' : 
                           currentConversation.channel === 'web' ? '🌐' : '📷'}
                        </span>
                        <span className="capitalize">{currentConversation.channel}</span>
                        <span className="mx-1">•</span>
                        <Clock size={12} className="mr-1" />
                        <span>Started {formatTime(currentConversation.startTime)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      currentConversation.status === 'active' ? 'primary' :
                      currentConversation.status === 'resolved' ? 'success' : 'warning'
                    }>
                      {currentConversation.status.charAt(0).toUpperCase() + currentConversation.status.slice(1)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<User size={14} />}
                      onClick={handleTakeOver}
                    >
                      Take Over
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.sender === 'customer' ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      message.sender === 'customer' ? 'bg-gray-400 mr-2' : 'bg-primary ml-2'
                    }`}>
                      {message.sender === 'customer' ? currentConversation.customerName.charAt(0) : 'A'}
                    </div>
                    <div className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'customer' ? 'bg-white' : 'bg-primary-light/10'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-text-light mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-b-card shadow-card p-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <Button
                    className="rounded-l-none"
                    onClick={handleSendMessage}
                    rightIcon={<Send size={16} />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-card shadow-card p-6 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-lg font-medium text-text-dark mb-2">No conversation selected</h3>
              <p className="text-text-light text-center mb-4">
                Select a conversation from the list to view the messages and interact with the customer.
              </p>
              <Button
                variant="outline"
                leftIcon={<ArrowRight size={16} />}
                onClick={() => setSelectedConversation(filteredConversations[0]?.id || null)}
              >
                Select a conversation
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Conversations;
