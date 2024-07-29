import { Link } from "react-router-dom";

// Default to null user and empty function for onLogout so that you don't need to pass in a user even if it doesnt exist
const Navigation = ({ user = null, onLogout = () => {} }) => {
  console.log(JSON.stringify(user));
  return (
    <nav className="navigation-wrapper">
      <div className="navigation-inner">
        <div className="navigation-name">
          <Link to="/" style={{
            fontWeight: 500,
            color: 'black',
            fontSize: '1.5rem',
           }}>Benstagram</Link>
        </div>
        <div className="navigation-links">
          {user ? (
            <ul>
              <li>
                <Link>Hello, <b>{user.username}</b></Link>
              </li>
              <li>
                <Link to="/favourites">Favourites</Link>
              </li>
              <li>
                <Link onClick={onLogout}>Logout</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;