import React, { useState } from 'react';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const RestorePage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRestore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.patch('/restore', { email });
      if (response.status === 200) {
        setSuccess('Account restored successfully! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
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
      title="Restore Account" 
      subtitle="Welcome back. Enter your email to recover your recently deleted account."
      leftPanelGraphic={
        <h1 className="text-5xl font-extrabold text-white uppercase tracking-tighter leading-tight">
          ACCOUNT<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            RECOVERY
          </span>
        </h1>
      }
    >
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </Link>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Recover Account</h2>
      <p className="text-gray-500 mb-8">Enter your registered email address to restore your account data.</p>
      
      <form onSubmit={handleRestore}>
        <Input 
          label="Email Address" 
          icon={Mail} 
          type="email" 
          placeholder="you@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4 text-center font-medium">{success}</p>}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:translate-y-[-2px] transition-all flex justify-center items-center mt-6"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Restore My Account"}
        </button>
      </form>
    </GlassCard>
  );
};
