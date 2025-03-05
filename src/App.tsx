import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Restaurants from './pages/Restaurants';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AgentConfig from './pages/AgentConfig';
import AgentSettings from './pages/AgentSettings';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Conversations from './pages/Conversations';
import Users from './pages/Users';
import Metrics from './pages/Metrics';
import N8NFlows from './pages/N8NFlows';
import Apparta from './pages/Apparta';
import NotificationCenter from './pages/NotificationCenter';
import RestaurantNotifications from './pages/RestaurantNotifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Super Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/agent-config" element={<AgentConfig />} />
        <Route path="/n8n-flows" element={<N8NFlows />} />
        <Route path="/apparta" element={<Apparta />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/notification-center" element={<NotificationCenter />} />
        
        {/* Restaurant Routes */}
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/agent-settings" element={<AgentSettings />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/users" element={<Users />} />
        <Route path="/restaurant-notifications" element={<RestaurantNotifications />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
