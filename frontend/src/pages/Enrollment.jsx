import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Enrollment.css';

const Enrollment = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentMessage, setEnrollmentMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        
        const enrollmentsRes = await axios.get('http://localhost:8000/api/enrollments/my_enrollments/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrollments(enrollmentsRes.data);

        const coursesRes = await axios.get('http://localhost:8000/api/courses/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(coursesRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to load enrollment data');
        console.error('Enrollment error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('access_token');
      const student = await axios.get('http://localhost:8000/api/students/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await axios.post('http://localhost:8000/api/enrollments/', {
        student_id: student.data.id,
        course_id: courseId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setEnrollmentMessage('Successfully enrolled in course!');
      setTimeout(() => setEnrollmentMessage(null), 3000);
      
      // Refresh enrollments
      const enrollmentsRes = await axios.get('http://localhost:8000/api/enrollments/my_enrollments/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrollments(enrollmentsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to enroll in course');
    }
  };

  if (loading) return <div className="enrollment-loading">Loading enrollments...</div>;

  const enrolledCourseIds = enrollments.map(e => e.course.id);
  const availableCourses = courses.filter(c => !enrolledCourseIds.includes(c.id));

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <h1>Course Enrollment</h1>
      </div>

      {error && <div className="enrollment-error">{error}</div>}
      {enrollmentMessage && <div className="enrollment-success">{enrollmentMessage}</div>}

      <div className="enrollment-grid">
        <section className="enrollment-section">
          <h2>My Enrollments ({enrollments.length})</h2>
          {enrollments.length > 0 ? (
            <div className="enrollments-list">
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="enrollment-card">
                  <h3>{enrollment.course.code}</h3>
                  <p>{enrollment.course.title}</p>
                  <p className="level">Level: {enrollment.course.level}</p>
                  <p className="status">Status: {enrollment.status}</p>
                  {enrollment.grade && <p className="grade">Grade: {enrollment.grade}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p>No active enrollments</p>
          )}
        </section>

        <section className="enrollment-section">
          <h2>Available Courses ({availableCourses.length})</h2>
          {availableCourses.length > 0 ? (
            <div className="courses-list">
              {availableCourses.map(course => (
                <div key={course.id} className="course-card">
                  <h3>{course.code}</h3>
                  <p>{course.title}</p>
                  <p className="level">Level: {course.level}</p>
                  <p className="credits">Credits: {course.credits}</p>
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="enroll-btn"
                  >
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>All courses enrolled or none available</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Enrollment;
