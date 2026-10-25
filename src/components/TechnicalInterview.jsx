import { useMemo, useState } from "react";
import { technicalQuestions } from "../data/technicalQuestions";
import { useAppContext } from "../context/AppContext";

const categories = [
  "All categories",
  ...new Set(technicalQuestions.map((question) => question.category)),
];

function TechnicalInterview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const { progress, updateProgress } = useAppContext();
  const bookmarkedIds = progress.technicalBookmarks || [];
  const reviewedIds = progress.technicalReviewed || [];

  const visibleQuestions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return technicalQuestions.filter((question) => {
      const matchesSearch =
        question.question.toLowerCase().includes(normalizedSearch) ||
        question.answer.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All categories" ||
        question.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const reviewPercentage = Math.round(
    (reviewedIds.length / technicalQuestions.length) * 100
  );

  function toggleBookmark(questionId) {
  updateProgress((currentProgress) => {
    const currentBookmarks = currentProgress.technicalBookmarks || [];

    return {
      ...currentProgress,
      technicalBookmarks: currentBookmarks.includes(questionId)
        ? currentBookmarks.filter((id) => id !== questionId)
        : [...currentBookmarks, questionId],
    };
  });
}

  function toggleReviewed(questionId) {
  updateProgress((currentProgress) => {
    const currentReviewed = currentProgress.technicalReviewed || [];

    return {
      ...currentProgress,
      technicalReviewed: currentReviewed.includes(questionId)
        ? currentReviewed.filter((id) => id !== questionId)
        : [...currentReviewed, questionId],
    };
  });
}

  return (
    <section className="technical-interview">
      <div className="practice-heading">
        <div>
          <p className="eyebrow">CONCEPT REVISION</p>
          <h2>Technical Interview Preparation</h2>
          <p>Revise essential concepts and save questions for later review.</p>
        </div>

        <div className="technical-progress-summary">
          <strong>{reviewPercentage}%</strong>
          <span>review progress</span>
          <progress
            id="technical-progress"
            max="100"
            value={reviewPercentage}
          >
            {reviewPercentage}%
          </progress>
        </div>
      </div>

      <div className="technical-filters">
        <label className="search-input">
          <span className="screen-reader-only">
            Search technical interview questions
          </span>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search questions or answers"
            type="search"
            value={searchTerm}
          />
        </label>

        <label>
          Subject
          <select
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={selectedCategory}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="results-count">
        {visibleQuestions.length} question
        {visibleQuestions.length === 1 ? "" : "s"} found
      </p>

      {visibleQuestions.length === 0 ? (
        <div className="empty-state">
          <h3>No matching questions</h3>
          <p>Try changing your search text or selected subject.</p>
        </div>
      ) : (
        <div className="technical-question-list">
          {visibleQuestions.map((question) => {
            const isOpen = openQuestionId === question.id;
            const isBookmarked = bookmarkedIds.includes(question.id);
            const isReviewed = reviewedIds.includes(question.id);

            return (
              <article className="technical-question-item" key={question.id}>
                <button
                  aria-controls={`answer-${question.id}`}
                  aria-expanded={isOpen}
                  className="technical-question-button"
                  onClick={() =>
                    setOpenQuestionId((currentId) =>
                      currentId === question.id ? null : question.id
                    )
                  }
                  type="button"
                >
                  <span>
                    <small>{question.category}</small>
                    {question.question}
                  </span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="technical-answer" id={`answer-${question.id}`}>
                    <p>{question.answer}</p>

                    <div className="technical-answer-actions">
                      <button
                        aria-pressed={isReviewed}
                        className={
                          isReviewed
                            ? "outline-button status-selected"
                            : "outline-button"
                        }
                        onClick={() => toggleReviewed(question.id)}
                        type="button"
                      >
                        {isReviewed ? "✓ Reviewed" : "Mark reviewed"}
                      </button>

                      <button
                        aria-pressed={isBookmarked}
                        className={`bookmark-button ${
                          isBookmarked ? "is-bookmarked" : ""
                        }`}
                        onClick={() => toggleBookmark(question.id)}
                        type="button"
                      >
                        {isBookmarked ? "★ Saved" : "☆ Bookmark"}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TechnicalInterview;