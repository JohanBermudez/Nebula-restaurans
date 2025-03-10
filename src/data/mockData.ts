import { User, Restaurant, Conversation, Metric, MenuItem, Reservation } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@nebula.ai',
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Trattoria',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    address: 'Calle Principal 123, Madrid',
    timezone: 'Europe/Madrid',
    status: 'active',
    channels: {
      whatsapp: true,
      facebook: true,
      web: true,
      instagram: false,
    },
    createdAt: '2023-01-15T10:30:00Z',
    totalInteractions: 1245,
    resolutionRate: 0.87,
  },
  {
    id: '2',
    name: 'Sushi Sakura',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    address: 'Avenida Libertad 45, Barcelona',
    timezone: 'Europe/Madrid',
    status: 'active',
    channels: {
      whatsapp: true,
      facebook: false,
      web: true,
      instagram: true,
    },
    createdAt: '2023-03-22T14:15:00Z',
    totalInteractions: 876,
    resolutionRate: 0.92,
  },
  {
    id: '3',
    name: 'Burger House',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    address: 'Plaza Mayor 8, Valencia',
    timezone: 'Europe/Madrid',
    status: 'inactive',
    channels: {
      whatsapp: true,
      facebook: true,
      web: false,
      instagram: false,
    },
    createdAt: '2023-05-10T09:45:00Z',
    totalInteractions: 432,
    resolutionRate: 0.75,
  },
  {
    id: '4',
    name: 'El Asador',
    logo: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    address: 'Calle Goya 78, Madrid',
    timezone: 'Europe/Madrid',
    status: 'active',
    channels: {
      whatsapp: true,
      facebook: true,
      web: true,
      instagram: true,
    },
    createdAt: '2023-02-05T11:20:00Z',
    totalInteractions: 1567,
    resolutionRate: 0.89,
  },
  {
    id: '5',
    name: 'Taco Loco',
    logo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    address: 'Avenida Diagonal 123, Barcelona',
    timezone: 'Europe/Madrid',
    status: 'pending',
    channels: {
      whatsapp: false,
      facebook: true,
      web: true,
      instagram: false,
    },
    createdAt: '2023-06-18T16:30:00Z',
    totalInteractions: 289,
    resolutionRate: 0.81,
  },
];

export const conversations: Conversation[] = [
  {
    id: '1',
    restaurantId: '1',
    channel: 'whatsapp',
    customerName: 'María García',
    status: 'active',
    startTime: '2023-07-15T18:30:00Z',
    lastMessageTime: '2023-07-15T18:45:00Z',
    messages: 8,
    topic: 'Reservations',
  },
  {
    id: '2',
    restaurantId: '1',
    channel: 'facebook',
    customerName: 'Juan Pérez',
    status: 'resolved',
    startTime: '2023-07-15T17:15:00Z',
    lastMessageTime: '2023-07-15T17:30:00Z',
    messages: 6,
    topic: 'Menu Information',
  },
  {
    id: '3',
    restaurantId: '2',
    channel: 'web',
    customerName: 'Ana Martínez',
    status: 'transferred',
    startTime: '2023-07-15T19:00:00Z',
    lastMessageTime: '2023-07-15T19:20:00Z',
    messages: 12,
    topic: 'Complaint',
  },
  {
    id: '4',
    restaurantId: '4',
    channel: 'instagram',
    customerName: 'Carlos Rodríguez',
    status: 'active',
    startTime: '2023-07-15T20:10:00Z',
    lastMessageTime: '2023-07-15T20:25:00Z',
    messages: 9,
    topic: 'Opening Hours',
  },
  {
    id: '5',
    restaurantId: '1',
    channel: 'whatsapp',
    customerName: 'Laura Sánchez',
    status: 'resolved',
    startTime: '2023-07-15T16:45:00Z',
    lastMessageTime: '2023-07-15T17:00:00Z',
    messages: 7,
    topic: 'Reservations',
  },
];

export const metrics: Record<string, Metric[]> = {
  '1': [
    {
      id: '1',
      restaurantId: '1',
      date: '2023-07-15',
      conversations: 45,
      resolutionRate: 0.88,
      reservations: 12,
      satisfaction: 4.7,
      averageResponseTime: 35,
      topTopics: [
        { topic: 'Reservations', count: 18 },
        { topic: 'Menu Information', count: 15 },
        { topic: 'Opening Hours', count: 8 },
        { topic: 'Special Requests', count: 4 },
      ],
    },
    {
      id: '2',
      restaurantId: '1',
      date: '2023-07-14',
      conversations: 38,
      resolutionRate: 0.85,
      reservations: 10,
      satisfaction: 4.5,
      averageResponseTime: 40,
      topTopics: [
        { topic: 'Reservations', count: 16 },
        { topic: 'Menu Information', count: 12 },
        { topic: 'Opening Hours', count: 6 },
        { topic: 'Special Requests', count: 4 },
      ],
    },
  ],
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.50,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    tags: ['vegetarian'],
    available: true,
    isSpecial: false,
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Spaghetti Carbonara',
    description: 'Spaghetti with egg, pecorino cheese, pancetta, and black pepper',
    price: 14.75,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    tags: [],
    available: true,
    isSpecial: true,
  },
  {
    id: '3',
    restaurantId: '1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
    price: 8.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    tags: ['vegetarian'],
    available: true,
    isSpecial: false,
  },
];

export const reservations: Reservation[] = [
  {
    id: '1',
    restaurantId: '1',
    customerName: 'María García',
    customerEmail: 'maria@example.com',
    customerPhone: '+34612345678',
    date: '2023-07-20',
    time: '20:30',
    partySize: 4,
    status: 'confirmed',
    notes: 'Window table if possible',
    source: 'ai_agent',
  },
  {
    id: '2',
    restaurantId: '1',
    customerName: 'Juan Pérez',
    customerEmail: 'juan@example.com',
    customerPhone: '+34698765432',
    date: '2023-07-21',
    time: '21:00',
    partySize: 2,
    status: 'confirmed',
    source: 'website',
  },
  {
    id: '3',
    restaurantId: '1',
    customerName: 'Ana Martínez',
    customerEmail: 'ana@example.com',
    customerPhone: '+34645678901',
    date: '2023-07-22',
    time: '19:30',
    partySize: 6,
    status: 'pending',
    notes: 'Birthday celebration',
    source: 'manual',
  },
];
