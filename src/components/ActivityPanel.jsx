function ActivityPanel({ title, description, items, actionLabel }) {
  return (
    <article className="activity-panel">
      <div className="activity-panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="text-button" type="button">
          {actionLabel}
        </button>
      </div>

      <ul className="activity-list">
        {items.map((item) => (
          <li key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </div>
            <span>{item.status}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ActivityPanel;