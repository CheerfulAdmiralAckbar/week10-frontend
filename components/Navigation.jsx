export default function Navigation({ user, onLogout }) {
  console.log(JSON.stringify(user));
  return (
    <nav className="navigation-wrapper">
      <div className="navigation-inner">
        <div className="navigation-name">
          <h1>Instagram</h1>
        </div>
        <div className="navigation-links">
          {user ? (
            <ul>
              <li>
                <a href="#">{user.username}</a>
              </li>
              <li>
                <a href="#">Favourites</a>
              </li>
              <li>
                <a onClick={onLogout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}