import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5555/blogs');
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {blog.image_url && <img src={blog.image_url} alt={blog.title} />}
            <h3>{blog.title}</h3>
            <p>{blog.bio}</p>
            <Link to={`/blogs/${blog.id}`}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;