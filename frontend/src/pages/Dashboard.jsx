import React, { useState } from 'react';
import { LogOut, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? You will have 7 days to restore it.')) {
      return;
    }
    setLoading(true)


    try {
      const response = await api.post(`/delete`);
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 min-h-screen flex items-center justify-center">
      <div className="bg-white/85 rounded-3xl p-10 md:p-14 shadow-glass backdrop-blur-xl border border-white/50 w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.username}!</h2>
        <p className="text-gray-500 mb-12 text-lg">You are successfully logged in to your AI workspace.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleLogout}
            className="bg-white border border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>

          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="bg-red-50 text-red-600 border border-red-200 font-semibold py-4 px-8 rounded-xl hover:bg-red-100 transition-colors flex justify-center items-center"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            Delete Account
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};
