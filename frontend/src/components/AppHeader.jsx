import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearAuthToken } from '../utils/auth.js';
import '../styles/AppHeader.css';

const API = import.meta.env.VITE_BACKEND_URL;

const AppHeader = ({ title = 'SoundStream', showUpload = true, showSearch = true }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.warn('Logout failed:', error?.response?.data || error.message);
    } finally {
      clearAuthToken();
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <header className="app-header">
      <div>
        <div className="app-header-brand">{title}</div>
        <div className="app-header-subtitle">Premium music streaming</div>
      </div>

      <div className="app-header-actions">
        {showSearch && (
          <button type="button" className="app-header-button" onClick={() => navigate('/search')}>
            Search
          </button>
        )}
        {showUpload && (
          <button type="button" className="app-header-button" onClick={() => navigate('/upload')}>
            Upload
          </button>
        )}
        <button type="button" className="app-header-button logout-button" onClick={handleLogout} disabled={loading}>
          {loading ? 'Signing out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
