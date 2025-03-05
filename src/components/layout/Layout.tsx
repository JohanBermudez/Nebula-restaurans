import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { currentUser } from '../../data/mockData';

interface LayoutProps {
  children: React.ReactNode;
  isSuperAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isSuperAdmin = true }) => {
  return (
    <div className="flex h-screen bg-background-secondary">
      <Sidebar isSuperAdmin={isSuperAdmin} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
