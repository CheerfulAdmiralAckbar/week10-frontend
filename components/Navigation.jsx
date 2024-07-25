import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => {
  console.log('Navigation props:', { user, onLogout });
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
                <Link to="/profile">{user.username}</Link>
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