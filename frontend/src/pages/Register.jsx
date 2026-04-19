import React from 'react'
import { useRef } from 'react'
import axiosBase from '../axiosConfig'
import {useNavigate} from 'react-router-dom'

function Register() {
    const navigate = useNavigate()


    const usernameRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const userData = {
            username: usernameRef.current.value,
            firstname: firstNameRef.current.value,
            lastname: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        if (!userData.username ||
            !userData.firstname ||
            !userData.lastname ||
            !userData.email ||
            !userData.password) {
            alert('All fields are required')
            return
        }


        try {
            await axiosBase.post('/user/register', userData)
            alert("User registered successfully")
            navigate('/login')
        } catch (error) {
            console.error('Error registering user:', error)
            alert('Error registering user')

        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Username:</span>
                    <input type="text" placeholder='username' ref={usernameRef} />
                </div>
                <br />
                <div>
                    <span>First Name:</span>
                    <input type="text" placeholder='first name' ref={firstNameRef} />
                </div>
                <br />
                <div>
                    <span>Last Name:</span>
                    <input type="text" placeholder='last name' ref={lastNameRef} />
                </div>
                <br />
                <div>
                    <span>Email:</span>
                    <input type="email" placeholder='email' ref={emailRef} />
                </div>
                <br />
                <div>
                    <span>Password:</span>
                    <input type="password" placeholder='password' ref={passwordRef} />
                </div>
                <br />
                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default Register