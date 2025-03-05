import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Tag, DollarSign, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { menuItems } from '../data/mockData';

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUnavailable, setShowUnavailable] = useState(false);
  
  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    const matchesAvailability = showUnavailable ? true : item.available;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <Layout isSuperAdmin={false}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Menu Management</h1>
          <p className="text-text-light">Manage your restaurant's menu items</p>
        </div>
        <Button leftIcon={<Plus size={18} />}>Add Menu Item</Button>
      </div>
      
      <div className="bg-white rounded-card shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-unavailable"
                checked={showUnavailable}
                onChange={() => setShowUnavailable(!showUnavailable)}
                className="h-4 w-4 text-primary focus:ring-primary-light rounded"
              />
              <label htmlFor="show-unavailable" className="ml-2 text-sm text-text-light">
                Show unavailable
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-text-light">No menu items found matching your criteria</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="h-full">
              <div className="relative h-48 rounded-t-card overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {item.isSpecial && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="accent">Special</Badge>
                  </div>
                )}
                {!item.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">Unavailable</span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark">{item.name}</h3>
                    <p className="text-sm text-text-light">{item.category}</p>
                  </div>
                  <div className="flex items-center text-lg font-semibold text-text-dark">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                
                <p className="text-sm text-text-dark mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={item.available ? <Clock size={14} /> : <Clock size={14} />}
                    >
                      {item.available ? 'Mark Unavailable' : 'Mark Available'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Trash2 size={14} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Menu Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.filter(c => c !== 'all').map((category) => {
                const itemsInCategory = menuItems.filter(item => item.category === category);
                const availableItems = itemsInCategory.filter(item => item.available);
                
                return (
                  <div key={category} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-text-dark">{category}</h3>
                      <span className="text-sm text-text-light">
                        {availableItems.length}/{itemsInCategory.length} items
                      </span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Plus size={14} />}
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              <div className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                <Button
                  variant="ghost"
                  leftIcon={<Plus size={16} />}
                >
                  Add Category
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Menu;
