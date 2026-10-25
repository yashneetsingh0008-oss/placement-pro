import { Link } from "react-router-dom";

function FeatureCard({ icon, title, description, actionLabel, path }) {
  return (
    <article className="feature-card">
      <span className="feature-icon" aria-hidden="true">
        {icon}
      </span>

      <h3>{title}</h3>
      <p>{description}</p>

      {path ? (
        <Link className="card-button" to={path}>
          {actionLabel} <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <button className="card-button" type="button">
          {actionLabel} <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  );
}

export default FeatureCard;