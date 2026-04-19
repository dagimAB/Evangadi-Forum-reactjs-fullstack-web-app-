import React, { useState } from 'react'
import { useRef } from 'react'
import axiosBase from '../axiosConfig'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const usernameRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const userData = {
            username: usernameRef.current.value.trim(),
            firstname: firstNameRef.current.value.trim(),
            lastname: lastNameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
        }
        if (!userData.username ||
            !userData.firstname ||
            !userData.lastname ||
            !userData.email ||
            !userData.password) {
            setErrorMessage('All fields are required')
            setSuccessMessage('')
            return
        }

        try {
            const { data } = await axiosBase.post('/user/register', userData)
            setSuccessMessage(data.message || 'User registered successfully')
            setErrorMessage('')
            navigate('/login')
        } catch (error) {
            const message = error.response?.data?.message || 'Error registering user'
            setErrorMessage(message)
            setSuccessMessage('')
            console.error('Error registering user:', error.response || error)
        }
    }

    return (
        <main className="page page-register">
            <section className="form-card">
                <h2>Join the network</h2>
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Username</label>
                        <input type="text" placeholder='User Name' ref={usernameRef} />
                    </div>
                    <div className="form-field">
                        <label>First Name</label>
                        <input type="text" placeholder='First Name' ref={firstNameRef} />
                    </div>
                    <div className="form-field">
                        <label>Last Name</label>
                        <input type="text" placeholder='Last Name' ref={lastNameRef} />
                    </div>
                    <div className="form-field">
                        <label>Email</label>
                        <input type="email" placeholder='Email' ref={emailRef} />
                    </div>
                    <div className="form-field">
                        <label>Password</label>
                        <input type="password" placeholder='Password' ref={passwordRef} />
                    </div>
                    <button className="button button--primary" type="submit">Agree and Join</button>
                </form>
                {errorMessage && <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green', marginTop: '1rem' }}>{successMessage}</p>}
            </section>

            <section className="hero">
                <h1>Evangadi Networks Q&A</h1>
                <p>Start your journey with our engaged developer community. Ask questions, share answers, and learn together.</p>
                <Link to="/how-it-works" className="button button--secondary hero-button">How it works</Link>
            </section>
        </main>
    )
}

export default Register