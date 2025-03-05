import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  Menu, 
  Users, 
  Database,
  Workflow,
  Bell
} from 'lucide-react';

interface SidebarProps {
  isSuperAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSuperAdmin = true }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-text-light hover:bg-gray-100 hover:text-text-dark'
        }
      `}
    >
      <span className="mr-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  const superAdminLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/restaurants', icon: <Store size={20} />, label: 'Restaurants' },
    { to: '/agent-config', icon: <Settings size={20} />, label: 'Agent Config' },
    { to: '/n8n-flows', icon: <Workflow size={20} />, label: 'N8N Flows' },
    { to: '/apparta', icon: <Database size={20} />, label: 'Apparta' },
    { to: '/notification-center', icon: <Bell size={20} />, label: 'Notifications' },
    { to: '/metrics', icon: <BarChart3 size={20} />, label: 'Metrics' },
  ];

  const restaurantLinks = [
    { to: '/restaurant-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/agent-settings', icon: <Settings size={20} />, label: 'Agent Settings' },
    { to: '/menu', icon: <Menu size={20} />, label: 'Menu' },
    { to: '/reservations', icon: <Calendar size={20} />, label: 'Reservations' },
    { to: '/conversations', icon: <MessageSquare size={20} />, label: 'Conversations' },
    { to: '/restaurant-notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { to: '/restaurant-metrics', icon: <BarChart3 size={20} />, label: 'Metrics' },
    { to: '/users', icon: <Users size={20} />, label: 'Users' },
  ];

  const links = isSuperAdmin ? superAdminLinks : restaurantLinks;

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="ml-2 text-lg font-semibold text-text-dark">Nebula</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 text-text-light"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="mt-4 px-2 space-y-1">
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} icon={link.icon} label={link.label} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
