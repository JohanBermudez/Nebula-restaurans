import React, { useState } from 'react';
import { Save, Play, History, Code, Sparkles, Cpu, MessageSquare } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const AgentConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('instructions');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [instructionsValue, setInstructionsValue] = useState(
    `You are a helpful AI assistant for La Trattoria restaurant. Your primary goal is to assist customers with:
1. Providing information about the menu, ingredients, and specials
2. Helping with reservations (checking availability, making new reservations)
3. Answering questions about location, hours, and policies
4. Being friendly and representing the restaurant's warm, family-oriented brand

Always be polite, concise, and helpful. If you don't know something, admit it and offer to connect the customer with a human staff member.`
  );

  const models = [
    { id: 'gpt-4', name: 'GPT-4 Turbo', provider: 'OpenAI', tokens: '128K', cost: '$$' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI', tokens: '16K', cost: '$' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', tokens: '200K', cost: '$$$' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', tokens: '180K', cost: '$$' },
    { id: 'deepseek-coder', name: 'DeepSeek Coder', provider: 'DeepSeek', tokens: '32K', cost: '$' },
  ];

  const functionExamples = [
    {
      name: 'check_reservation_availability',
      description: 'Check if tables are available for reservation at a specific date and time',
      parameters: {
        date: 'YYYY-MM-DD format date',
        time: 'HH:MM format time',
        party_size: 'Number of guests'
      }
    },
    {
      name: 'create_reservation',
      description: 'Create a new reservation',
      parameters: {
        customer_name: 'Full name of the customer',
        customer_phone: 'Phone number',
        date: 'YYYY-MM-DD format date',
        time: 'HH:MM format time',
        party_size: 'Number of guests',
        special_requests: 'Any special requests (optional)'
      }
    },
    {
      name: 'get_menu_items',
      description: 'Get menu items by category or dietary restrictions',
      parameters: {
        category: 'Category of food (e.g., appetizers, main, dessert)',
        dietary_restrictions: 'Dietary restrictions (e.g., vegetarian, gluten-free)'
      }
    }
  ];

  return (
    <Layout isSuperAdmin={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Agent Configuration</h1>
        <p className="text-text-light">Configure AI agents for all restaurants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Global Agent Configuration</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" leftIcon={<History size={16} />}>
                    History
                  </Button>
                  <Button size="sm" leftIcon={<Save size={16} />}>
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: 'instructions', label: 'Instructions', icon: <MessageSquare size={16} /> },
                    { id: 'functions', label: 'Functions', icon: <Code size={16} /> },
                    { id: 'parameters', label: 'Parameters', icon: <Sparkles size={16} /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-text-light hover:text-text-dark hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-4">
                {activeTab === 'instructions' && (
                  <div>
                    <p className="text-sm text-text-light mb-2">
                      Define the base instructions for all restaurant agents. These instructions will be applied to all agents and can be customized per restaurant.
                    </p>
                    <textarea
                      value={instructionsValue}
                      onChange={(e) => setInstructionsValue(e.target.value)}
                      className="w-full h-80 p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    />
                  </div>
                )}

                {activeTab === 'functions' && (
                  <div>
                    <p className="text-sm text-text-light mb-4">
                      Configure function calls that agents can use to interact with your backend services.
                    </p>
                    
                    <div className="space-y-4">
                      {functionExamples.map((func, index) => (
                        <div key={index} className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-text-dark">{func.name}</h3>
                              <p className="text-sm text-text-light mt-1">{func.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Delete</Button>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-text-dark">Parameters:</h4>
                            <div className="mt-1 grid grid-cols-2 gap-2">
                              {Object.entries(func.parameters).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <span className="font-mono text-primary-dark">{key}</span>: {value}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full" leftIcon={<Plus size={16} />}>
                        Add New Function
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'parameters' && (
                  <div>
                    <p className="text-sm text-text-light mb-4">
                      Configure global parameters for all agents.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">
                          Temperature
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            defaultValue="0.7"
                            className="w-full mr-3"
                          />
                          <span className="text-sm font-medium w-10">0.7</span>
                        </div>
                        <p className="text-xs text-text-light mt-1">
                          Controls randomness: Lower values are more deterministic, higher values more creative.
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">
                          Maximum Response Length
                        </label>
                        <Input
                          type="number"
                          defaultValue={1000}
                          className="w-full"
                        />
                        <p className="text-xs text-text-light mt-1">
                          Maximum number of tokens in the agent's response.
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">
                          Human Handoff Threshold
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            defaultValue="0.35"
                            className="w-full mr-3"
                          />
                          <span className="text-sm font-medium w-10">0.35</span>
                        </div>
                        <p className="text-xs text-text-light mt-1">
                          Confidence threshold below which the agent will suggest transferring to a human.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <Button variant="outline" size="sm" leftIcon={<Play size={16} />}>
                    Test Agent
                  </Button>
                </div>
                <p className="text-xs text-text-light">
                  Last updated: 2 hours ago by Admin User
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-md p-4 h-64 mb-4 overflow-y-auto">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    U
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm">Hello, I'd like to make a reservation for 4 people tomorrow at 8pm.</p>
                  </div>
                </div>
                <div className="flex items-start mb-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ml-3">
                    AI
                  </div>
                  <div className="bg-primary-light/10 rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm">I'd be happy to help you with a reservation for 4 people tomorrow at 8:00 PM. Let me check if we have availability for that time.</p>
                    <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
                      Function called: check_reservation_availability(date: "2023-07-16", time: "20:00", party_size: 4)
                    </div>
                    <p className="text-sm mt-2">Great news! We do have availability for 4 people tomorrow at 8:00 PM. Would you like me to make this reservation for you? I'll just need your name and contact number.</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a test message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                <Button className="rounded-l-none">Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-light mb-4">
                Select the default AI model for all agents. This can be overridden per restaurant.
              </p>
              
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedModel === model.id
                        ? 'border-primary bg-primary-light/10'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Cpu size={18} className={selectedModel === model.id ? 'text-primary' : 'text-gray-400'} />
                        <span className="ml-2 font-medium">{model.name}</span>
                      </div>
                      {selectedModel === model.id && (
                        <Badge variant="primary">Selected</Badge>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-xs text-text-light">
                      <span className="mr-3">Provider: {model.provider}</span>
                      <span className="mr-3">Context: {model.tokens}</span>
                      <span>Cost: {model.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Restaurant-Specific Overrides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-light mb-4">
                Configure which settings restaurants can override in their dashboards.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Agent Personality</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Greeting Messages</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Response Style</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Model Selection</label>
                  <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Function Calls</label>
                  <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-dark">Temperature</label>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary-light rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AgentConfig;
