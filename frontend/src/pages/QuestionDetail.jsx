import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosBase from '../axiosConfig'
import { UserContext } from '../App'

function QuestionDetail() {
    const { user } = useContext(UserContext)
    const { questionId } = useParams()
    const [question, setQuestion] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        async function fetchQuestion() {
            try {
                const token = localStorage.getItem('token')
                const { data } = await axiosBase.get(`/questions/${questionId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                setQuestion(data)
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load question')
            } finally {
                setLoading(false)
            }
        }
        fetchQuestion()
    }, [questionId, user, navigate])

    return (
        <main className="page">
            <section className="section section--hero">
                <div className="section__header">
                    <div>
                        <h1>Question Detail</h1>
                    </div>
                    <Link to="/questions" className="button button--primary">Back to Questions</Link>
                </div>
            </section>

            <section className="section section--content">
                {loading ? (
                    <p>Loading question…</p>
                ) : error ? (
                    <p className="text--error">{error}</p>
                ) : question ? (
                    <article className="question-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p className="question-card__author">Posted by {question.username || question.author || 'Anonymous'}</p>
                        <h2 className="question-card__title">{question.question || question.title || question.question_title}</h2>
                        <p style={{ marginTop: '1rem', color: '#475569' }}>{question.description || question.question_description || 'No description provided.'}</p>
                    </article>
                ) : (
                    <p>No question data found.</p>
                )}
            </section>
        </main>
    )
}

export default QuestionDetail
