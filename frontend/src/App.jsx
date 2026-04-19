import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import HowItWorks from "./pages/HowItWorks"
import Questions from "./pages/Questions"
import QuestionDetail from "./pages/QuestionDetail"
import AskQuestion from "./pages/AskQuestion"
import Header from "./components/Header"
import { useEffect, useState, createContext } from "react"
import axiosBase from "./axiosConfig"

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  async function checkUser() {
    if (!token) {
      setLoading(false)
      navigate('/login')
      return
    }

    try {
      const { data } = await axiosBase.get('/user/checkUser', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      setUser(data.user)
    } catch (error) {
      console.error('Error checking user:', error.response || error)
      localStorage.removeItem('token')
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
