import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from  'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@nebula.ai' && password === 'password') {
        navigate('/dashboard');
      } else if (email === 'restaurant@nebula.ai' && password === 'password') {
        navigate('/restaurant-dashboard');
      } else {
        setError('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-card shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
            N
          </div>
          <h1 className="mt-4 text-2xl font-bold text-text-dark">Welcome to Nebula</h1>
          <p className="mt-1 text-text-light">AI Agents for Restaurants</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <div className="flex justify-end mb-6">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-dark"
            >
              Forgot password?
            </button>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<LogIn size={18} />}
          >
            Sign In
          </Button>
          
          <div className="mt-6 text-center text-sm text-text-light">
            <p>Demo credentials:</p>
            <p className="mt-1">Super Admin: admin@nebula.ai / password</p>
            <p>Restaurant: restaurant@nebula.ai / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
