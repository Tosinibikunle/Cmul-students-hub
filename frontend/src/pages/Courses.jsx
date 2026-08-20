import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_BASE_URL}/courses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === 'all') return true;
    return course.level === filter;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <p>Choose courses</p>
      </div>

      {error && <div className="courses-error">{error}</div>}

      <div className="courses-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Levels
        </button>
        <button
          className={`filter-btn ${filter === '100' ? 'active' : ''}`}
          onClick={() => setFilter('100')}
        >
          100 Level
        </button>
        <button
          className={`filter-btn ${filter === '200' ? 'active' : ''}`}
          onClick={() => setFilter('200')}
        >
          200 Level
        </button>
        <button
          className={`filter-btn ${filter === '300' ? 'active' : ''}`}
          onClick={() => setFilter('300')}
        >
          300 Level
        </button>
        <button
          className={`filter-btn ${filter === '400' ? 'active' : ''}`}
          onClick={() => setFilter('400')}
        >
          400 Level
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="no-courses">
          <p>No courses found for the selected filter.</p>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
