import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/enrollment?course=${course.id}`);
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.name}</h3>
        <span className="course-level">{course.level}-Level</span>
      </div>

      <div className="course-body">
        <h4>{course.code}</h4>
        <p className="course-description">{course.description}</p>

        <div className="course-meta">
          <div className="credits">
            💳 {course.credits} Credits
          </div>
          <div className="instructor">
            👨‍🏫 {course.instructor || 'TBA'}
          </div>
        </div>
      </div>

      <div className="course-footer">
        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
