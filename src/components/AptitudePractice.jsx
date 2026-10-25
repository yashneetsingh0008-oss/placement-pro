import { useState } from "react";
import { aptitudeQuestions } from "../data/aptitudeQuestions";
import { useAppContext } from "../context/AppContext";

const categories = [
  "All",
  ...new Set(aptitudeQuestions.map((question) => question.category)),
];

function AptitudePractice() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { progress, updateProgress } = useAppContext();
  const answers = progress.aptitudeAnswers || {};

  const visibleQuestions =
    selectedCategory === "All"
      ? aptitudeQuestions
      : aptitudeQuestions.filter(
          (question) => question.category === selectedCategory
        );

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const hasAnswered = selectedAnswer !== undefined;

  const answeredCount = Object.keys(answers).length;
  const score = aptitudeQuestions.reduce((total, question) => {
    return answers[question.id] === question.correctAnswer ? total + 1 : total;
  }, 0);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
  }

  function handleAnswerSelect(optionIndex) {
  if (hasAnswered) {
    return;
  }

  updateProgress((currentProgress) => ({
    ...currentProgress,
    aptitudeAnswers: {
      ...(currentProgress.aptitudeAnswers || {}),
      [currentQuestion.id]: optionIndex,
    },
  }));
}

  function getOptionClass(optionIndex) {
    if (!hasAnswered) {
      return "";
    }

    if (optionIndex === currentQuestion.correctAnswer) {
      return "is-correct";
    }

    if (optionIndex === selectedAnswer) {
      return "is-incorrect";
    }

    return "is-muted";
  }

  return (
    <section className="aptitude-practice" id="aptitude">
      <div className="practice-heading">
        <div>
          <p className="eyebrow">INTERACTIVE PRACTICE</p>
          <h2>Aptitude Practice</h2>
          <p>
            Answer a question, read the explanation, and track your progress.
          </p>
        </div>

        <div className="practice-score" aria-label="Practice score">
          <strong>{score}</strong>
          <span>correct out of {answeredCount} attempted</span>
        </div>
      </div>

      <div className="category-filters" aria-label="Aptitude categories">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? "is-active" : ""}
            key={category}
            onClick={() => handleCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="question-progress">
        <span>
          Question {currentQuestionIndex + 1} of {visibleQuestions.length}
        </span>
        <div className="question-indicators" aria-label="Question navigation">
          {visibleQuestions.map((question, index) => (
            <button
              className={
                answers[question.id] !== undefined
                  ? "is-complete"
                  : index === currentQuestionIndex
                    ? "is-current"
                    : ""
              }
              key={question.id}
              onClick={() => setCurrentQuestionIndex(index)}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <article className="question-card">
        <p className="question-category">{currentQuestion.category}</p>
        <h3>{currentQuestion.question}</h3>

        <div className="answer-options">
          {currentQuestion.options.map((option, index) => (
            <button
              className={`answer-option ${getOptionClass(index)}`}
              disabled={hasAnswered}
              key={option}
              onClick={() => handleAnswerSelect(index)}
              type="button"
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          ))}
        </div>

        {hasAnswered && (
          <div
            className={`answer-feedback ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "is-correct"
                : "is-incorrect"
            }`}
          >
            <strong>
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct answer!"
                : "Not quite."}
            </strong>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="question-navigation">
          <button
            className="outline-button"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((index) => index - 1)}
            type="button"
          >
            ← Previous
          </button>

          <button
            className="primary-button"
            disabled={currentQuestionIndex === visibleQuestions.length - 1}
            onClick={() => setCurrentQuestionIndex((index) => index + 1)}
            type="button"
          >
            Next Question →
          </button>
        </div>
      </article>
    </section>
  );
}

export default AptitudePractice;