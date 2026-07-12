import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          Students Hub
        </Link>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/courses" className="nav-link">Courses</Link>
              <Link to="/enrollment" className="nav-link">Enrollment</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <div className="nav-user">
                <span className="user-greeting">Hi, {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
