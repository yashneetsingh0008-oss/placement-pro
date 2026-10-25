import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function MockTest({ test }) {
  const testId = test ? test.id : "";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(
    (test?.durationMinutes || 0) * 60
  );
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { updateProgress } = useAppContext();
const resultRecordedRef = useRef(false);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSecondsLeft((test?.durationMinutes || 0) * 60);
    setIsConfirming(false);
    setIsSubmitted(false);
    resultRecordedRef.current = false;
  }, [testId, test?.durationMinutes]);

  useEffect(() => {
    if (!test || isSubmitted || secondsLeft <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((currentTime) => Math.max(currentTime - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [testId, isSubmitted, secondsLeft, test]);
  useEffect(() => {
  if (!test || !isSubmitted || resultRecordedRef.current) {
    return;
  }

  resultRecordedRef.current = true;

  const finalScore = test.questions.reduce((total, question) => {
    return answers[question.id] === question.correctAnswer ? total + 1 : total;
  }, 0);

  updateProgress((currentProgress) => ({
    ...currentProgress,
    mockTestResults: [
      ...(currentProgress.mockTestResults || []),
      {
        testId: test.id,
        score: finalScore,
        totalQuestions: test.questions.length,
        completedAt: new Date().toISOString(),
      },
    ],
  }));
}, [answers, isSubmitted, test, testId, updateProgress]);

  useEffect(() => {
    if (test && secondsLeft === 0 && !isSubmitted) {
      setIsSubmitted(true);
    }
  }, [secondsLeft, isSubmitted, testId, test]);
  useEffect(() => {
  if (!test || !isSubmitted || resultRecordedRef.current) {
    return;
  }

  resultRecordedRef.current = true;

  const finalScore = test.questions.reduce((total, question) => {
    return answers[question.id] === question.correctAnswer ? total + 1 : total;
  }, 0);

  updateProgress((currentProgress) => ({
    ...currentProgress,
    mockTestResults: [
      ...(currentProgress.mockTestResults || []),
      {
        testId: test.id,
        score: finalScore,
        totalQuestions: test.questions.length,
        answeredCount: Object.keys(answers).length,
        completedAt: new Date().toISOString(),
      },
    ],
  }));
}, [answers, isSubmitted, test, testId, updateProgress]);
  if (!test) {
    return (
      <section className="mock-test-empty">
        <h2>Mock test not found</h2>
        <p>Please choose a test from the mock-test list.</p>
      </section>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = test.questions.length - answeredCount;

  const score = test.questions.reduce((total, question) => {
    return answers[question.id] === question.correctAnswer ? total + 1 : total;
  }, 0);

  const scorePercentage = Math.round((score / test.questions.length) * 100);

  function selectAnswer(optionIndex) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: optionIndex,
    }));
  }

  function submitTest() {
    setIsConfirming(false);
    setIsSubmitted(true);
  }

  function restartTest() {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSecondsLeft(test.durationMinutes * 60);
    setIsConfirming(false);
    resultRecordedRef.current = false;
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    const recommendation =
      scorePercentage >= 80
        ? "Excellent work. Keep practicing to maintain your speed and accuracy."
        : scorePercentage >= 50
          ? "Good foundation. Review the incorrect answers and repeat similar questions."
          : "Focus on fundamentals first, then take this test again after revision.";

    return (
      <section className="mock-test-result">
        <p className="eyebrow">TEST COMPLETE</p>
        <h1>{test.title} Results</h1>

        <div className="result-summary-grid">
          <article>
            <strong>{score}</strong>
            <span>correct answers</span>
          </article>
          <article>
            <strong>{test.questions.length - score}</strong>
            <span>incorrect or unanswered</span>
          </article>
          <article>
            <strong>{scorePercentage}%</strong>
            <span>overall score</span>
          </article>
        </div>

        <article className="recommendation-card">
          <h2>Recommendation</h2>
          <p>{recommendation}</p>
          <button className="primary-button" onClick={restartTest} type="button">
            Retake test
          </button>
        </article>

        <section className="answer-review">
          <h2>Review your answers</h2>

          {test.questions.map((question, index) => {
            const selectedAnswer = answers[question.id];
            const isCorrect = selectedAnswer === question.correctAnswer;
            const wasAnswered = selectedAnswer !== undefined;

            return (
              <article
                className={`review-item ${
                  isCorrect
                    ? "is-correct"
                    : wasAnswered
                      ? "is-incorrect"
                      : "is-unanswered"
                }`}
                key={question.id}
              >
                <p>
                  Question {index + 1} · {question.section}
                </p>
                <h3>{question.question}</h3>
                <span>
                  Your answer:{" "}
                  {wasAnswered
                    ? question.options[selectedAnswer]
                    : "Not answered"}
                </span>
                <span>Correct answer: {question.options[question.correctAnswer]}</span>
                <p className="review-explanation">{question.explanation}</p>
              </article>
            );
          })}
        </section>
      </section>
    );
  }

  return (
    <section className="mock-test-interface">
      <header className="mock-test-header">
        <div>
          <p className="eyebrow">TIMED MOCK TEST</p>
          <h1>{test.title}</h1>
          <p>
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </p>
        </div>

        <div className="test-timer" aria-label={`${formatTime(secondsLeft)} remaining`}>
          <span>Time left</span>
          <strong>{formatTime(secondsLeft)}</strong>
        </div>
      </header>

      <div className="test-progress-row">
        <span>{answeredCount} answered</span>
        <progress max={test.questions.length} value={answeredCount}>
          {answeredCount} of {test.questions.length}
        </progress>
      </div>

      <div className="test-layout">
        <aside className="test-question-navigation">
          <h2>Questions</h2>
          <div>
            {test.questions.map((question, index) => (
              <button
                className={`test-nav-button ${
                  answers[question.id] !== undefined ? "is-answered" : ""
                } ${index === currentQuestionIndex ? "is-current" : ""}`}
                key={question.id}
                onClick={() => setCurrentQuestionIndex(index)}
                type="button"
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p>Blue: current · Green: answered</p>
        </aside>

        <article className="test-question-card">
          <p className="question-category">{currentQuestion.section}</p>
          <h2>{currentQuestion.question}</h2>

          <div className="answer-options">
            {currentQuestion.options.map((option, index) => (
              <button
                className={`answer-option ${
                  answers[currentQuestion.id] === index ? "is-selected" : ""
                }`}
                key={option}
                onClick={() => selectAnswer(index)}
                type="button"
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>

          <div className="question-navigation">
            <button
              className="outline-button"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((index) => index - 1)}
              type="button"
            >
              ← Previous
            </button>

            {currentQuestionIndex === test.questions.length - 1 ? (
              <button
                className="primary-button"
                onClick={() => setIsConfirming(true)}
                type="button"
              >
                Submit test
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => setCurrentQuestionIndex((index) => index + 1)}
                type="button"
              >
                Next question →
              </button>
            )}
          </div>
        </article>
      </div>

      {isConfirming && (
        <div className="modal-backdrop">
          <div
            aria-labelledby="submit-test-heading"
            aria-modal="true"
            className="confirmation-modal"
            role="dialog"
          >
            <h2 id="submit-test-heading">Submit this test?</h2>
            <p>
              You have {unansweredCount} unanswered question
              {unansweredCount === 1 ? "" : "s"}.
            </p>

            <div className="modal-actions">
              <button
                className="outline-button"
                onClick={() => setIsConfirming(false)}
                type="button"
              >
                Continue test
              </button>
              <button className="primary-button" onClick={submitTest} type="button">
                Submit now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MockTest;