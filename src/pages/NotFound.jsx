import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="coding-detail-empty">
      <p className="eyebrow">404 ERROR</p>
      <h2>Page not found</h2>
      <p>The page you requested does not exist in Placement Pro.</p>
      <Link className="primary-button" to="/">
        Return to dashboard
      </Link>
    </section>
  );
}

export default NotFound;