import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_BASE_URL}/students/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}! 👋</h1>
        <p>Here's your academic overview</p>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      {stats && (
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Total Courses</h3>
              <p className="stat-number">{stats.total_courses || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Enrolled Courses</h3>
              <p className="stat-number">{stats.enrolled_courses || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>Average GPA</h3>
              <p className="stat-number">{stats.average_gpa?.toFixed(2) || 'N/A'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Credits</h3>
              <p className="stat-number">{stats.total_credits || 0}</p>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/courses" className="action-card">
              <span className="action-icon">🔍</span>
              <h3>Browse Courses</h3>
              <p>Explore available courses</p>
            </a>
            <a href="/enrollment" className="action-card">
              <span className="action-icon">✍️</span>
              <h3>Manage Enrollment</h3>
              <p>View and enroll in courses</p>
            </a>
            <a href="/profile" className="action-card">
              <span className="action-icon">👤</span>
              <h3>Update Profile</h3>
              <p>Edit your information</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
