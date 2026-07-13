import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          email: response.data.email
        }));
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.message.includes('deleted')) {
          setError('Account deleted. Please restore it below.');
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError('Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-8">Sign in to access your unified inbox</p>

      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />



        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold py-4 rounded-xl shadow-[0_8px_20px_rgba(232,62,140,0.3)] hover:translate-y-[-2px] transition-all flex justify-center items-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </button>
      </form>



      <p className="text-center mt-8 text-gray-500 text-sm">
        Don't have an account? <Link to="/register" className="text-primary-end font-semibold hover:underline">Sign up</Link>
      </p>

      <p className="text-center mt-3 text-gray-500 text-sm">
        Have a deleted account? <Link to="/restore" className="text-blue-500 font-semibold hover:underline">Restore it here</Link>
      </p>
    </GlassCard>
  );
};
