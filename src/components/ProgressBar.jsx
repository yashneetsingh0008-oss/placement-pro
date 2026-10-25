function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="topic-progress-bar">
      <div
        className="topic-progress-fill"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

export default ProgressBar;