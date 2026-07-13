import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, icon: Icon, type = 'text', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-5">
      {label && <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-4 text-gray-400 w-5 h-5" />}
        <input
          type={inputType}
          className={`w-full bg-input-bg border border-gray-200/50 rounded-xl py-3.5 transition-all duration-300 focus:outline-none focus:border-primary-end focus:ring-4 focus:ring-primary-end/10 focus:bg-white text-gray-800 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};
