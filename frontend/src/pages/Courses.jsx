import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const res = await axios.get('http://localhost:8000/api/courses/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load courses');
        console.error('Courses error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  if (loading) return <div className="courses-loading">Loading courses...</div>;
  if (error) return <div className="courses-error">Error: {error}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <div className="filter-controls">
          <label htmlFor="level-filter">Filter by Level:</label>
          <select 
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="no-courses">No courses found for selected level</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
