export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'restaurant_admin' | 'staff';
  avatar?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo?: string;
  address: string;
  timezone: string;
  status: 'active' | 'inactive' | 'pending';
  channels: {
    whatsapp: boolean;
    facebook: boolean;
    web: boolean;
    instagram: boolean;
  };
  createdAt: string;
  totalInteractions: number;
  resolutionRate: number;
}

export interface Conversation {
  id: string;
  restaurantId: string;
  channel: 'whatsapp' | 'facebook' | 'web' | 'instagram';
  customerName: string;
  status: 'active' | 'resolved' | 'transferred';
  startTime: string;
  lastMessageTime: string;
  messages: number;
  topic?: string;
}

export interface Metric {
  id: string;
  restaurantId: string;
  date: string;
  conversations: number;
  resolutionRate: number;
  reservations: number;
  satisfaction: number;
  averageResponseTime: number;
  topTopics: Array<{topic: string, count: number}>;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  tags: string[];
  available: boolean;
  isSpecial: boolean;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  source: 'ai_agent' | 'manual' | 'website';
}
