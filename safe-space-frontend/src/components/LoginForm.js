import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/profile');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;