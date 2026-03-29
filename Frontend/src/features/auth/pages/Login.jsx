import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (!normalizedEmail || !normalizedPassword) {
      setErrorMessage('Please provide email and password.')
      return
    }

    const result = await handleLogin({
      email: normalizedEmail,
      password: normalizedPassword,
    })

    if (result?.success) {
      navigate('/')
      return
    }

    setErrorMessage(result?.error || 'Unable to login. Please try again.')
  }

  if (loading) {
    return (
      <main className='auth-page'>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main className='auth-page'>
      <div className='auth-page__panel'>
        <p className='auth-page__brand'>HIKARI_CV</p>
        <h1>Welcome Back</h1>
        <p className='auth-page__subtitle'>Log in to continue building your interview strategy.</p>

        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              type='email'
              id='email'
              name='email'
              placeholder='Enter email address'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              type='password'
              id='password'
              name='password'
              placeholder='Enter password'
              required
            />
          </div>

          <button className='button primary-button'>Login</button>
        </form>

        {errorMessage && <p className='auth-page__error'>{errorMessage}</p>}

        <p className='auth-page__switch'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
