import React, { useState } from 'react';
import '../auth.form.scss';
import { useAuth } from '../hooks/useAuth';

import { useNavigate, Link } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handelRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    await handelRegister({ username, email, password })
    navigate('/')
  };

  if (loading) {
    return (<main><div className="form-container"><h1>Loading...</h1></div> </main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
            // required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            // required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            // required
            />
          </div>

          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to={'/login'}>Login </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
