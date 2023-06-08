import React, { useState } from 'react';
import { postSignin } from '../../api/index';
import { Navigate } from 'react-router-dom';
import './signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await postSignin({ email: email, password: password });
      console.log(response.data);
      setEmail('');
      setPassword('');
      if (response.data.success) {
        setLoggedIn(true);
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>

      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Signin;
