import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../../../components/common/LoadingScreen'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    const normalizedUsername = username.trim()
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (!normalizedUsername || !normalizedEmail || !normalizedPassword) {
      setErrorMessage('Please fill all fields.')
      return
    }

    const result = await handleRegister({
      username: normalizedUsername,
      email: normalizedEmail,
      password: normalizedPassword,
    })

    if (result?.success) {
      navigate('/')
      return
    }

    setErrorMessage(result?.error || 'Unable to register. Please try again.')
  }

  if (loading) {
    return (
      <LoadingScreen
        compact
        title='Creating your account...'
        subtitle='Setting up your profile so you can start generating interview plans.'
      />
    )
  }

  return (
    <main className='auth-page'>
      <div className='auth-page__panel'>
        <p className='auth-page__brand'>HIKARI_CV</p>
        <h1>Create Account</h1>
        <p className='auth-page__subtitle'>Set up your profile and start generating interview plans.</p>

        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              type='text'
              id='username'
              name='username'
              placeholder='Enter username'
              required
            />
          </div>

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

          <button className='button primary-button'>Register</button>
        </form>

        {errorMessage && <p className='auth-page__error'>{errorMessage}</p>}

        <p className='auth-page__switch'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register
