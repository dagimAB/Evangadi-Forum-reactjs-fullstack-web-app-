import React, { useContext, useState } from 'react'
import { useRef } from 'react'
import axiosBase from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()

    if (!email || !password) {
      setErrorMessage('Email and password are required')
      return
    }

    try {
      const { data } = await axiosBase.post('/user/login', { email, password })
      localStorage.setItem('token', data.token)
      const { data: userData } = await axiosBase.get('/user/checkUser', {
        headers: { Authorization: 'Bearer ' + data.token },
      })
      setUser(userData.user)
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setErrorMessage(message)
      console.error('Login failed:', error.response || error)
    }
  }

  return (
    <main className="page page-login">
      <section className="form-card">
        <h2>Login to your account</h2>
        <p>Don't have an account? <Link to="/register">Create a new account</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder='Your Email' ref={emailRef} />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" placeholder='Your Password' ref={passwordRef} />
          </div>
          <button className="button button--primary" type="submit">Sign in</button>
        </form>
        {errorMessage && <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>}
      </section>

      <section className="hero">
        <h1>Evangadi Networks Q&A</h1>
        <p>Connect with other learners, post your questions, and share answers in one place.</p>
        <Link to="/register" className="button button--secondary hero-button">Create account</Link>
      </section>
    </main>
  )
}

export default Login