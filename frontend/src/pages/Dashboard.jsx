import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        
        const studentRes = await axios.get('http://localhost:8000/api/students/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(studentRes.data);

        const enrollmentsRes = await axios.get('http://localhost:8000/api/enrollments/my_enrollments/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrollments(enrollmentsRes.data);
        
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {student?.user?.first_name}!</h1>
        <p>Student ID: {student?.student_id}</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>Profile Information</h2>
          {student && (
            <div className="profile-info">
              <p><strong>Email:</strong> {student.user.email}</p>
              <p><strong>Phone:</strong> {student.phone || 'Not provided'}</p>
              <p><strong>Date of Birth:</strong> {student.date_of_birth || 'Not provided'}</p>
              <p><strong>Address:</strong> {student.address || 'Not provided'}</p>
            </div>
          )}
        </section>

        <section className="dashboard-card">
          <h2>Current Enrollments</h2>
          {enrollments.length > 0 ? (
            <div className="enrollments-list">
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="enrollment-item">
                  <h3>{enrollment.course.code}</h3>
                  <p>{enrollment.course.title}</p>
                  <p className="status">Status: {enrollment.status}</p>
                  {enrollment.grade && <p className="grade">Grade: {enrollment.grade}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p>No active enrollments</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
