import { mockTests } from "../data/mockTests";

function MockTestList({ onSelectTest }) {
  return (
    <section className="mock-test-list">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">TIMED PRACTICE</p>
          <h2>Mock Tests</h2>
          <p>
            Test your knowledge under a time limit, then review every answer
            and identify where to improve.
          </p>
        </div>
      </div>

      <div className="mock-test-grid">
        {mockTests.map((test) => (
          <article className="mock-test-card" key={test.id}>
            <div className="mock-test-card-top">
              <span className="mock-test-icon" aria-hidden="true">
                ✓
              </span>
              <span>{test.durationMinutes} min</span>
            </div>

            <h3>{test.title}</h3>
            <p>{test.description}</p>

            <div className="mock-test-meta">
              <span>{test.questions.length} questions</span>
              <span>Mixed practice</span>
            </div>

            <button
              className="primary-button mock-test-button"
              onClick={() => onSelectTest(test.id)}
              type="button"
            >
              Start test →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MockTestList;