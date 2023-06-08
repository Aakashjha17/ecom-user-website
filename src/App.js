import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { verify } from './api/index';
import Signin from './components/Auth/signin';
import Dashboard from './components/Dashboard/dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Retrieve the token from the cookie
        const getCookieValue = (cookieName) => {
          const cookies = document.cookie.split('; ');
          for (let i = 0; i < cookies.length; i++) {
            const [name, value] = cookies[i].split('=');
            if (name === cookieName) {
              return value;
            }
          }
        };
        
        const token = getCookieValue('userToken')

        // Send token to the server for verification
        const response = await verify({ token });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace={true} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
