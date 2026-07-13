import React, { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/register', { username, email, password });
      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting...');
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          email: response.data.email
        }));
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard

      subtitle="Create your account today and unlock the power of seamless productivity and personalized insights."
      leftPanelGraphic={
        <h1 className="text-5xl font-extrabold text-white uppercase tracking-tighter leading-tight">
          GET<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            STARTED
          </span>
        </h1>
      }
    >


      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>

      <form onSubmit={handleRegister}>
        <Input
          label="Username"
          icon={User}
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
        {success && <p className="text-green-500 text-sm mb-4 text-center font-medium">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold py-4 rounded-xl shadow-[0_8px_20px_rgba(232,62,140,0.3)] hover:translate-y-[-2px] transition-all flex justify-center items-center mt-4"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-8 text-gray-500 text-sm">
        Already have an account? <Link to="/" className="text-primary-end font-semibold hover:underline">Sign in</Link>
      </p>

      <p className="text-center mt-3 text-gray-500 text-sm">
        Have a deleted account? <Link to="/restore" className="text-blue-500 font-semibold hover:underline">Restore it here</Link>
      </p>
    </GlassCard>
  );
};
