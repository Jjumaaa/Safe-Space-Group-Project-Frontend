import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5555/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
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
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;