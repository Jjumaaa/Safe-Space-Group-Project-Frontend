import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Safe-Space</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {token ? (
          <>
            <li><Link to="/create">Create Blog</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;