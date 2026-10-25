



import { useMemo, useState } from "react";
import { codingQuestions } from "../data/codingQuestions";
import { useAppContext } from "../context/AppContext";
import useDebouncedValue from "../hooks/useDebouncedValue";

function CodingPractice({ onOpenQuestion }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const { progress, updateProgress } = useAppContext();

  const questionStatus = progress.codingStatus || {};
  const bookmarkedIds = progress.codingBookmarks || [];
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const topics = ["All", ...new Set(codingQuestions.map((question) => question.topic))];

  const filteredQuestions = useMemo(() => {
    const difficultyOrder = {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    };

    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

    const result = codingQuestions.filter((question) => {
      const matchesTopic =
        selectedTopic === "All" || question.topic === selectedTopic;

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        question.difficulty === selectedDifficulty;

      const matchesSearch = question.title
        .toLowerCase()
        .includes(normalizedSearch);

      return matchesTopic && matchesDifficulty && matchesSearch;
    });

    return result.sort((firstQuestion, secondQuestion) => {
      if (sortBy === "difficulty") {
        return (
          difficultyOrder[firstQuestion.difficulty] -
            difficultyOrder[secondQuestion.difficulty] ||
          firstQuestion.title.localeCompare(secondQuestion.title)
        );
      }

      return firstQuestion.title.localeCompare(secondQuestion.title);
    });
  }, [debouncedSearchTerm, selectedDifficulty, selectedTopic, sortBy]);

  function updateQuestionStatus(questionId, nextStatus) {
    updateProgress((currentProgress) => ({
      ...currentProgress,
      codingStatus: {
        ...(currentProgress.codingStatus || {}),
        [questionId]: nextStatus,
      },
    }));
  }

  function toggleBookmark(questionId) {
    updateProgress((currentProgress) => {
      const currentBookmarks = currentProgress.codingBookmarks || [];
      const isAlreadyBookmarked = currentBookmarks.includes(questionId);

      return {
        ...currentProgress,
        codingBookmarks: isAlreadyBookmarked
          ? currentBookmarks.filter((id) => id !== questionId)
          : [...currentBookmarks, questionId],
      };
    });
  }

  const solvedCount = Object.values(questionStatus).filter(
    (status) => status === "Solved"
  ).length;

  return (
    <section className="coding-practice">
      <div className="section-heading">
        <p className="eyebrow">Coding practice</p>
        <h1>Build your problem-solving skills</h1>
        <p>
          Search questions, filter by topic or difficulty, and track what you
          have attempted or solved.
        </p>
      </div>

      <div className="coding-summary">
        <p>
          Solved: <strong>{solvedCount}</strong> of {codingQuestions.length}
        </p>
        <p>
          Bookmarked: <strong>{bookmarkedIds.length}</strong>
        </p>
      </div>

      <div className="filter-panel">
        <label>
          Search questions
          <input
            type="search"
            placeholder="Search by question title"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label>
          Topic
          <select
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select
            value={selectedDifficulty}
            onChange={(event) => setSelectedDifficulty(event.target.value)}
          >
            <option value="All">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label>
          Sort by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="title">Title</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </label>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="empty-state">
          <h2>No questions found</h2>
          <p>Try changing your search text or filters.</p>
        </div>
      ) : (
        <div className="coding-question-grid">
          {filteredQuestions.map((question) => {
            const currentStatus = questionStatus[question.id] || "Not started";
            const isBookmarked = bookmarkedIds.includes(question.id);

            return (
              <article className="coding-question-card" key={question.id}>
                <div className="card-meta">
                  <span>{question.topic}</span>
                  <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                  </span>
                </div>

                <h2>{question.title}</h2>
                <p>{question.description}</p>

                <p className="question-status">
                  Status: <strong>{currentStatus}</strong>
                </p>

                <div className="card-actions">
                  <button
                    className="view-question-button"
                    type="button"
                    onClick={() => onOpenQuestion?.(question.id)}
                  >
                    View details →
                  </button>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() =>
                      updateQuestionStatus(question.id, "Attempted")
                    }
                  >
                    Mark attempted
                  </button>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => updateQuestionStatus(question.id, "Solved")}
                  >
                    Mark solved
                  </button>

                  <button
                    className="bookmark-button"
                    type="button"
                    onClick={() => toggleBookmark(question.id)}
                    aria-label={`${
                      isBookmarked ? "Remove" : "Add"
                    } ${question.title} bookmark`}
                  >
                    {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CodingPractice;