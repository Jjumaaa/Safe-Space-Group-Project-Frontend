import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const userResponse = await fetch('http://localhost:5555/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();
        if (!userResponse.ok) throw new Error(userData.message || 'Failed to fetch profile');

        const blogsResponse = await fetch(`http://localhost:5555/users/${userData.id}/blogs`);
        const blogsData = await blogsResponse.json();
        if (!blogsResponse.ok) throw new Error('Failed to fetch blogs');

        setUser(userData);
        setBlogs(blogsData);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('Unauthorized')) navigate('/');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile">
      <h2>{user?.username}'s Profile</h2>
      <p>Email: {user?.email || 'N/A'}</p>
      <h3>Your Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {blog.image_url && <img src={blog.image_url} alt={blog.title} />}
            <h4>{blog.title}</h4>
            <p>{blog.bio}</p>
            <button onClick={() => navigate(`/create?blogId=${blog.id}`)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;