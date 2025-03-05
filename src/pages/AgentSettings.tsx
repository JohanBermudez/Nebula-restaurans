import React, { useState } from 'react';
import { Save, Play, MessageSquare, Palette, Volume2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AgentSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personality');
  const [personalityValue, setPersonalityValue] = useState(
    `Our restaurant has a warm, family-friendly atmosphere. We pride ourselves on authentic Italian cuisine made with fresh, local ingredients. Our staff is attentive and knowledgeable about our menu.

When interacting with customers, be friendly, enthusiastic, and helpful. Use a conversational tone that's professional but not overly formal. Feel free to make recommendations based on customer preferences.`
  );

  const [greetingValue, setGreetingValue] = useState(
    `Welcome to La Trattoria! I'm your virtual assistant, here to help with reservations, menu information, or any questions you might have about our restaurant. How can I assist you today?`
  );

  const [farewellValue, setFarewellValue] = useState(
    `Thank you for chatting with La Trattoria! We look forward to serving you soon. Buon appetito!`
  );

  return (
    <Layout isSuperAdmin={false}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-dark">Agent Settings</h1>
        <p className="text-text-light">Customize your restaurant's AI assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Agent Customization</CardTitle>
                <Button size="sm" leftIcon={<Save size={16} />}>
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: 'personality', label: 'Personality', icon: <MessageSquare size={16} /> },
                    { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
                    { id: 'voice', label: 'Voice & Tone', icon: <Volume2 size={16} /> },
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
                {activeTab === 'personality' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Restaurant Personality
                      </label>
                      <p className="text-xs text-text-light mb-2">
                        Describe your restaurant's atmosphere and service style to help the AI assistant match your brand voice.
                      </p>
                      <textarea
                        value={personalityValue}
                        onChange={(e) => setPersonalityValue(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Greeting Message
                      </label>
                      <p className="text-xs text-text-light mb-2">
                        This is the first message customers will see when they start a conversation.
                      </p>
                      <textarea
                        value={greetingValue}
                        onChange={(e) => setGreetingValue(e.target.value)}
                        className="w-full h-20 p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Farewell Message
                      </label>
                      <p className="text-xs text-text-light mb-2">
                        This message will be sent when a conversation ends.
                      </p>
                      <textarea
                        value={farewellValue}
                        onChange={(e) => setFarewellValue(e.target.value)}
                        className="w-full h-20 p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Agent Name
                      </label>
                      <Input
                        type="text"
                        defaultValue="Trattoria Assistant"
                        placeholder="Enter a name for your AI assistant"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-3">
                        Agent Avatar
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                          T
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Image
                        </Button>
                      </div>
                      <p className="text-xs text-text-light mt-2">
                        Recommended size: 256x256 pixels. JPG or PNG format.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Chat Bubble Color
                      </label>
                      <div className="flex items-center space-x-3 mt-2">
                        {['#1E3A8A', '#7E22CE', '#0EA5E9', '#10B981', '#F59E0B'].map((color) => (
                          <div
                            key={color}
                            className={`w-8 h-8 rounded-full cursor-pointer ${
                              color === '#1E3A8A' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <input
                          type="color"
                          defaultValue="#1E3A8A"
                          className="w-8 h-8 rounded-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'voice' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Communication Style
                      </label>
                      <select
                        defaultValue="friendly"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      >
                        <option value="formal">Formal</option>
                        <option value="friendly">Friendly</option>
                        <option value="casual">Casual</option>
                        <option value="enthusiastic">Enthusiastic</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Response Length
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          defaultValue="3"
                          className="w-full mr-3"
                        />
                        <span className="text-sm font-medium w-20">Medium</span>
                      </div>
                      <div className="flex justify-between text-xs text-text-light mt-1">
                        <span>Concise</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Language
                      </label>
                      <select
                        defaultValue="en"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="it">Italian</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-text-dark">
                        Use Emojis
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="toggle-emoji"
                          defaultChecked
                          className="sr-only"
                        />
                        <label
                          htmlFor="toggle-emoji"
                          className="block h-6 rounded-full cursor-pointer bg-gray-300 before:absolute before:h-5 before:w-5 before:left-0.5 before:top-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:translate-x-4"
                        ></label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Your Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-md p-4 h-64 mb-4 overflow-y-auto">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    U
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm">What are your specials today?</p>
                  </div>
                </div>
                <div className="flex items-start mb-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ml-3">
                    T
                  </div>
                  <div className="bg-primary-light/10 rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm">Today's specials include our Chef's signature Risotto ai Funghi Porcini made with imported Italian porcini mushrooms, and our Branzino al Forno, which is a whole sea bass baked with herbs and lemon. Both are customer favorites! Would you like to know more about either of these dishes?</p>
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
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-text-dark">Resolution Rate</p>
                    <p className="text-sm font-medium text-text-dark">87%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-xs text-text-light mt-1">Percentage of conversations resolved without human intervention</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-text-dark">Customer Satisfaction</p>
                    <p className="text-sm font-medium text-text-dark">4.6/5</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-xs text-text-light mt-1">Average rating from customer feedback</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-text-dark">Response Time</p>
                    <p className="text-sm font-medium text-text-dark">2.3s</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-xs text-text-light mt-1">Average time to generate a response</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-text-dark mb-3">Top Topics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Reservations</span>
                    <span className="text-text-light">42%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Menu Questions</span>
                    <span className="text-text-light">28%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Hours & Location</span>
                    <span className="text-text-light">15%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Special Requests</span>
                    <span className="text-text-light">10%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Other</span>
                    <span className="text-text-light">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
                  <h3 className="text-sm font-medium text-blue-800">Keep it conversational</h3>
                  <p className="text-xs text-blue-700 mt-1">
                    Use natural language that matches your restaurant's style. Avoid overly formal or robotic responses.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r-md">
                  <h3 className="text-sm font-medium text-green-800">Update menu regularly</h3>
                  <p className="text-xs text-green-700 mt-1">
                    Keep your menu information current so the agent can provide accurate recommendations.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded-r-md">
                  <h3 className="text-sm font-medium text-purple-800">Monitor conversations</h3>
                  <p className="text-xs text-purple-700 mt-1">
                    Regularly review conversation logs to identify areas for improvement.
                  </p>
                </div>
                
                <a
                  href="#"
                  className="block text-center text-sm text-primary hover:text-primary-dark"
                >
                  View all best practices
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AgentSettings;
