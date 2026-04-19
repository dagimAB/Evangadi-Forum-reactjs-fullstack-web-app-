import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axiosConfig'
import { UserContext } from '../App'

function AskQuestion() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
            setErrorMessage('Please add both a title and description to your question.')
            setSuccessMessage('')
            return
        }

        if (!user) {
            navigate('/login')
            return
        }

        try {
            const token = localStorage.getItem('token')
            await axiosBase.post(
                '/questions',
                { title: title.trim(), description: description.trim() },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
            )
            setSuccessMessage('Your question has been posted successfully.')
            setErrorMessage('')
            setTitle('')
            setDescription('')
            setTimeout(() => navigate('/questions'), 800)
        } catch (error) {
            const message = error.response?.data?.message || 'Unable to post question.'
            setErrorMessage(message)
            setSuccessMessage('')
            console.error('Error posting question:', error.response || error)
        }
    }

    return (
        <main className="page">
            <section className="section section--hero">
                <div className="section__header">
                    <div>
                        <h1>Ask a public question</h1>
                        <p className="section__subtitle">Share your question with the Evangadi community.</p>
                    </div>
                    <button className="button button--primary" type="button" onClick={() => navigate('/questions')}>
                        Go to Question page
                    </button>
                </div>
            </section>

            <section className="section section--content">
                <div className="section__header">
                    <div>
                        <h2>Steps to write a good question</h2>
                        <ul>
                            <li>Summarize your problem in a one-line title.</li>
                            <li>Describe your problem in more detail.</li>
                            <li>Describe what you tried and what you expected to happen.</li>
                            <li>Review your question and post it to the site.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label>Question Description</label>
                        <textarea
                            placeholder="Question Description..."
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button className="button button--primary" type="submit">Post Your Question</button>
                    </div>
                    {errorMessage && <p className="text--error">{errorMessage}</p>}
                    {successMessage && <p style={{ color: '#16a34a' }}>{successMessage}</p>}
                </form>
            </section>
        </main>
    )
}

export default AskQuestion
