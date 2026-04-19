import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosBase from '../axiosConfig'
import { UserContext } from '../App'

function Questions() {
    const { user } = useContext(UserContext)
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        async function fetchQuestions() {
            try {
                const token = localStorage.getItem('token')
                const { data } = await axiosBase.get('/questions', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                setQuestions(Array.isArray(data) ? data : [])
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load questions')
            } finally {
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [user, navigate])

    return (
        <main className="page page--questions">
            <section className="section section--hero">
                <div className="section__header">
                    <h1>Questions</h1>
                    <Link to="/" className="button button--primary">Ask Question</Link>
                </div>
                {user && <p className="section__subtitle">Welcome back, {user.username}</p>}
            </section>

            <section className="section section--content">
                {loading ? (
                    <p>Loading questions...</p>
                ) : error ? (
                    <p className="text--error">{error}</p>
                ) : questions.length === 0 ? (
                    <p>No questions available yet.</p>
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

export default Questions
