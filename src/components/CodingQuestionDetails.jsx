import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function createStarterCode(title) {
  return `// ${title}
function solve(input) {
  // Write your solution here

}`;
}

function CodingQuestionDetails({ question }) {
  const questionId = question ? question.id : "";

  const [codeDraft, setCodeDraft] = useState(
    createStarterCode(question?.title || "Coding Practice")
  );
  const { progress, updateProgress } = useAppContext();
  const status = progress.codingStatus?.[questionId] || "Not started";
  const isBookmarked = (progress.codingBookmarks || []).includes(questionId);

  useEffect(() => {
    setCodeDraft(createStarterCode(question?.title || "Coding Practice"));
  }, [questionId, question?.title]);
  function updateQuestionStatus(nextStatus) {
  updateProgress((currentProgress) => ({
    ...currentProgress,
    codingStatus: {
      ...(currentProgress.codingStatus || {}),
      [questionId]: nextStatus,
    },
  }));
}

function toggleBookmark() {
  updateProgress((currentProgress) => {
    const currentBookmarks = currentProgress.codingBookmarks || [];

    return {
      ...currentProgress,
      codingBookmarks: currentBookmarks.includes(questionId)
        ? currentBookmarks.filter((id) => id !== questionId)
        : [...currentBookmarks, questionId],
    };
  });
}

  if (!question) {
    return (
      <section className="coding-detail-empty">
        <h2>Question not found</h2>
        <p>Please select a coding question from the practice list.</p>
      </section>
    );
  }

  return (
    <section className="coding-question-details">
      <p className="detail-breadcrumb">
        Coding Practice <span>/</span> {question.topic}
      </p>

      <div className="detail-heading">
        <div>
          <div className="question-badges">
            <span>{question.topic}</span>
            <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
              {question.difficulty}
            </span>
          </div>
          <h1>{question.title}</h1>
        </div>

        <button
          aria-pressed={isBookmarked}
          className={`bookmark-button ${
            isBookmarked ? "is-bookmarked" : ""
          }`}
          onClick={toggleBookmark}
          type="button"
        >
          {isBookmarked ? "★ Saved" : "☆ Bookmark"}
        </button>
      </div>

      <div className="detail-content-grid">
        <article className="problem-description-card">
          <h2>Problem</h2>
          <p>{question.description}</p>

          <h2>Examples</h2>
          <div className="examples-list">
            {question.examples.map((example, index) => (
              <article className="example-card" key={example.input}>
                <h3>Example {index + 1}</h3>
                <p>
                  <strong>Input:</strong>
                </p>
                <pre>
                  <code>{example.input}</code>
                </pre>
                <p>
                  <strong>Output:</strong>
                </p>
                <pre>
                  <code>{example.output}</code>
                </pre>
                <p className="example-explanation">{example.explanation}</p>
              </article>
            ))}
          </div>

          <h2>Constraints</h2>
          <ul className="constraints-list">
            {question.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </article>

        <aside className="code-practice-card">
          <div className="code-practice-heading">
            <div>
              <h2>Your Practice Draft</h2>
              <p>JavaScript</p>
            </div>
            <span className="coding-status">{status}</span>
          </div>

          <label className="screen-reader-only" htmlFor="code-draft">
            Write your JavaScript solution
          </label>
          <textarea
            id="code-draft"
            onChange={(event) => setCodeDraft(event.target.value)}
            spellCheck="false"
            value={codeDraft}
          />

          <p className="editor-note">
            This is a practice editor only. Code is not compiled or executed.
          </p>

          <div className="detail-actions">
            <button
              className={
                status === "Attempted"
                  ? "outline-button status-selected"
                  : "outline-button"
              }
              onClick={() => updateQuestionStatus("Attempted")}
              type="button"
            >
              Mark Attempted
            </button>

            <button
              className={
                status === "Solved"
                  ? "primary-button status-selected"
                  : "primary-button"
              }
              onClick={() => updateQuestionStatus("Solved")}
              type="button"
            >
              Mark Solved
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CodingQuestionDetails;