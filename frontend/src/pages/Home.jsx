import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import axiosBase from '../axiosConfig'

function Home() {
  const { user } = useContext(UserContext)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      if (!user) return
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const { data } = await axiosBase.get('/questions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        setQuestions(Array.isArray(data) ? data.slice(0, 4) : [])
      } catch (err) {
        console.error('Error loading questions:', err.response || err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [user])

  if (!user) {
    return (
      <main className="page page-login">
        <section className="form-card">
          <h2>Login to your account</h2>
          <p>Don't have an account? <Link to="/register">Create a new account</Link></p>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="Your Email" disabled />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" placeholder="Your Password" disabled />
          </div>
          <Link to="/login" className="button button--primary">Sign in</Link>
          <p style={{ marginTop: '1rem' }}><Link to="/register">Create an account?</Link></p>
        </section>

        <section className="hero">
          <h1>Evangadi Networks Q&A</h1>
          <p>Join the Evangadi community to ask questions and share answers. Build knowledge together with your peers.</p>
          <Link to="/how-it-works" className="button button--secondary hero-button">How it works</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="section section--hero">
        <div className="section__header">
          <div>
            <h1>Welcome back, {user.username}</h1>
            <p className="section__subtitle">Ready to ask a new question or browse the latest posts?</p>
          </div>
          <Link to="/ask-question" className="button button--primary">Ask Question</Link>
        </div>
      </section>

      <section className="section section--content">
        <div className="section__header">
          <div>
            <h2>Latest Questions</h2>
            <p className="section__subtitle">See the latest questions from the community.</p>
          </div>
          <Link to="/questions" className="button button--secondary">Go to Question page</Link>
        </div>
        {loading ? (
          <p>Loading recent questions...</p>
        ) : questions.length === 0 ? (
          <p>No recent questions are available yet.</p>
        ) : (
          <div className="question-list">
            {questions.map((question) => (
              <article key={question.question_id || question.id} className="question-card">
                <div>
                  <p className="question-card__author">{question.username || question.author || 'Anonymous'}</p>
                  <h2 className="question-card__title">{question.question || question.title || question.question_title}</h2>
                </div>
                <Link className="question-card__link" to={`/questions/${question.question_id || question.id}`}>
                  View
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home