import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const BlogForm = ({ blogId }) => {
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: '',
    bio: '',
    image_url: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`http://localhost:5555/blogs/${blogId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setInitialValues({
              title: data.title,
              bio: data.bio,
              image_url: data.image_url || '',
            });
          } else {
            setError('Failed to fetch blog');
          }
        } catch (err) {
          setError('An error occurred. Please try again.');
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    bio: Yup.string().required('Bio is required'),
    image_url: Yup.string().url('Invalid URL format').optional(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = blogId
        ? `http://localhost:5555/blogs/${blogId}`
        : 'http://localhost:5555/blogs';
      const method = blogId ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save blog');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>{blogId ? 'Edit Blog' : 'Create Blog'}</h2>
      {error && <p className="error">{error}</p>}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <Field as="textarea" name="bio" />
              <ErrorMessage name="bio" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="image_url">Image URL</label>
              <Field type="text" name="image_url" />
              <ErrorMessage name="image_url" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {blogId ? 'Update Blog' : 'Create Blog'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogForm;