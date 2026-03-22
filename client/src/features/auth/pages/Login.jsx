import React, { useState } from 'react';
import '../auth.form.scss';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth'



const Login = () => {

  const { loading, handelLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    await handelLogin({ email, password })
    navigate('/')
  };

  if (loading) {
    return (
      <main>
        <div className="form-container">
          <h1>Loading...</h1>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => { setEmail(e.target.value) }}
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
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            // required
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={'/register'}>Register </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
