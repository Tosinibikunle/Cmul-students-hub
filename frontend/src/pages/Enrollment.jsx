import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Enrollment.css';

const Enrollment = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_BASE_URL}/enrollments/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrollments(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    if (!window.confirm('Are you sure you want to unenroll from this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('Successfully unenrolled from course');
      fetchEnrollments();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <h1>Course Enrollment</h1>
        <p>Manage your course enrollments</p>
      </div>

      {error && <div className="enrollment-error">{error}</div>}
      {successMessage && <div className="enrollment-success">{successMessage}</div>}

      {enrollments.length === 0 ? (
        <div className="no-enrollments">
          <p>You are not enrolled in any courses yet.</p>
          <a href="/courses" className="browse-courses-link">
            Browse available courses
          </a>
        </div>
      ) : (
        <div className="enrollments-list">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="enrollment-card">
              <div className="enrollment-info">
                <h3>{enrollment.course.name}</h3>
                <p className="course-code">{enrollment.course.code}</p>
                <p className="course-description">{enrollment.course.description}</p>
                <div className="enrollment-meta">
                  <span>📅 Enrolled: {new Date(enrollment.enrolled_date).toLocaleDateString()}</span>
                  <span>👨‍🎓 Instructor: {enrollment.course.instructor || 'TBA'}</span>
                </div>
              </div>
              <div className="enrollment-actions">
                <button
                  className="unenroll-btn"
                  onClick={() => handleUnenroll(enrollment.id)}
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrollment;
