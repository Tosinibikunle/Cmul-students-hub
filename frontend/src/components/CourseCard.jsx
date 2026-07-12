import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/enrollment', { state: { selectedCourse: course } });
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.code}</h3>
        <span className="course-level">{course.level} Level</span>
      </div>
      <div className="course-body">
        <h4>{course.title}</h4>
        <p className="course-description">{course.description}</p>
        <div className="course-meta">
          <span className="credits">Credits: {course.credits}</span>
          {course.instructor && (
            <span className="instructor">Instructor: {course.instructor}</span>
          )}
        </div>
      </div>
      <div className="course-footer">
        <button onClick={handleEnroll} className="enroll-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
