import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
     logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MERN Auth App</h1>
        </Link>
        <nav>
          {user && (
            <div className='welcome'>
              <div>
                <span style={{ color: 'grey' }}>Welcome back ! </span>
                <span className='email-user'>{user.email}</span>
              </div>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
          <Link to="/login" className='login-button'>Login</Link>
          <Link to="/signup" className='login-button'>Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
