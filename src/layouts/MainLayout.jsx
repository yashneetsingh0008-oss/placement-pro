import { Link, NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Placement Pro home">
          <span className="brand-mark">P</span>
          <span>
            Placement <strong>Pro</strong>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/aptitude">Aptitude</NavLink>
          <NavLink to="/coding">Coding</NavLink>
          <NavLink to="/technical-interview">Technical</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/mock-tests">Mock Tests</NavLink>
          <NavLink to="/interview-prep">Interview Prep</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/bonus-quiz">Bonus Quiz</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© 2026 Placement Pro. Built for focused placement preparation.</p>
        <Link to="/">Back to top ↑</Link>
      </footer>
    </div>
  );
}

export default MainLayout;