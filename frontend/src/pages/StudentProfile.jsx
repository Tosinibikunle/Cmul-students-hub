import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/StudentProfile.css';

const StudentProfile = () => {
  const { user, logout } = useAuth();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const res = await axios.get('http://localhost:8000/api/students/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(res.data);
        setFormData(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudentProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.patch(`http://localhost:8000/api/students/${student.id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Update error:', err);
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Student Profile</h1>
        <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {error && <div className="profile-error">{error}</div>}
      {success && <div className="profile-success">{success}</div>}

      {student && (
        <div className="profile-content">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="user.first_name" 
                  value={formData.user?.first_name || ''}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea 
                  name="address" 
                  value={formData.address || ''}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="date_of_birth" 
                  value={formData.date_of_birth || ''}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-btn">Save Changes</button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Student ID:</strong> {student.student_id}</p>
              <p><strong>Name:</strong> {student.user.first_name} {student.user.last_name}</p>
              <p><strong>Email:</strong> {student.user.email}</p>
              <p><strong>Phone:</strong> {student.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {student.address || 'Not provided'}</p>
              <p><strong>Date of Birth:</strong> {student.date_of_birth || 'Not provided'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
