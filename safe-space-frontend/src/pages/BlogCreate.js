import { useLocation } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

const BlogCreate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogId = searchParams.get('blogId');

  return <BlogForm blogId={blogId} />;
};

export default BlogCreate;