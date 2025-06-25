import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import BlogList from '../components/BlogList';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const token = localStorage.getItem('token');

  return (
    <div>
      {!token && (
        <div>
          {showLogin ? <LoginForm /> : <RegisterForm />}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Need to register?' : 'Already have an account?'}
          </button>
        </div>
      )}
      <BlogList />
    </div>
  );
};

export default Home;