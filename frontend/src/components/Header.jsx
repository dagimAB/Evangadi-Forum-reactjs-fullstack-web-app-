import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App'
import logo from '../assets/evangadi_logo.png'
import '../styles/header.css'

function Header() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')
    }

    return (
        <header className="header">
            <div className="header__brand">
                <Link to="/">
                    <img src={logo} alt="Evangadi logo" className="header__logo" />
                </Link>
            </div>

            <nav className="header__nav">
                <Link to="/" className="header__link">Home</Link>
                <Link to="/how-it-works" className="header__link">How it works</Link>
            </nav>

            <div className="header__actions">
                {user ? (
                    <button type="button" className="header__button" onClick={handleLogout}>
                        LogOut
                    </button>
                ) : (
                    <Link className="header__button header__button--link" to="/login">
                        SIGN IN
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header
