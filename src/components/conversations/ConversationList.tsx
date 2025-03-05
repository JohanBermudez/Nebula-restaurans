import React from 'react';
import { MessageSquare, Clock, User } from 'lucide-react';
import Badge from '../ui/Badge';
import { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelect,
  selectedId,
}) => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return '📱';
      case 'facebook':
        return '👤';
      case 'web':
        return '🌐';
      case 'instagram':
        return '📷';
      default:
        return '💬';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="primary">Active</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'transferred':
        return <Badge variant="warning">Transferred</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-text-dark">Recent Conversations</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-text-light">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedId === conversation.id ? 'bg-primary-light/10' : ''
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className="text-xl mr-2" aria-hidden="true">
                    {getChannelIcon(conversation.channel)}
                  </span>
                  <div>
                    <h4 className="font-medium text-text-dark">{conversation.customerName}</h4>
                    <div className="flex items-center text-xs text-text-light mt-1">
                      <MessageSquare size={12} className="mr-1" />
                      <span>{conversation.messages} messages</span>
                      {conversation.topic && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{conversation.topic}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-xs text-text-light mb-1">
                    {formatTime(conversation.lastMessageTime)}
                  </div>
                  {getStatusBadge(conversation.status)}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-text-light">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>Started {formatTime(conversation.startTime)}</span>
                </div>
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span>Customer</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
