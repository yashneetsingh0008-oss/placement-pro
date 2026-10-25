import { useEffect, useState } from "react";
import { fallbackTriviaQuestions } from "../data/fallbackTriviaQuestions";

function decodeHtml(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function ApiPractice() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [requestKey, setRequestKey] = useState(0);
  const [isAppending, setIsAppending] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadQuestions() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );

        if (!response.ok) {
          throw new Error("The question service did not respond successfully.");
        }

        const data = await response.json();

        if (data.response_code !== 0 || data.results.length === 0) {
          throw new Error("The question service did not return questions.");
        }

        const apiQuestions = data.results.map((item, index) => {
          const correctAnswer = decodeHtml(item.correct_answer);

          return {
            id: `api-${requestKey}-${index}`,
            category: decodeHtml(item.category),
            question: decodeHtml(item.question),
            options: [
              ...item.incorrect_answers.map((answer) => decodeHtml(answer)),
              correctAnswer,
            ].sort(() => Math.random() - 0.5),
            correctAnswer,
          };
        });

        if (!isCancelled) {
          setQuestions((currentQuestions) =>
            isAppending
              ? [...currentQuestions, ...apiQuestions]
              : apiQuestions
          );
          setSelectedAnswers({});
          setUsingFallback(false);
        }
      } catch {
        if (!isCancelled) {
          setErrorMessage(
            "Live questions are unavailable right now. Showing local practice questions instead."
          );
          setQuestions(fallbackTriviaQuestions);
          setSelectedAnswers({});
          setUsingFallback(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      isCancelled = true;
    };
  }, [isAppending, requestKey]);

  function retryLiveQuestions() {
    setIsAppending(false);
    setRequestKey((currentKey) => currentKey + 1);
  }

  function loadMoreQuestions() {
    setIsAppending(true);
    setRequestKey((currentKey) => currentKey + 1);
  }

  function selectAnswer(questionId, answer) {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  if (isLoading && questions.length === 0) {
    return (
      <section className="api-practice">
        <p className="api-status">Loading bonus practice questions…</p>
      </section>
    );
  }

  return (
    <section className="api-practice">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">OPTIONAL API PRACTICE</p>
          <h2>Bonus Knowledge Quiz</h2>
          <p>
            These general multiple-choice questions are fetched from an
            external service when available.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="api-message" role="status">
          {errorMessage}
          <button onClick={retryLiveQuestions} type="button">
            Retry live questions
          </button>
        </div>
      )}

      {usingFallback && (
        <p className="api-fallback-note">
          You are currently using the built-in fallback question set.
        </p>
      )}

      <div className="api-question-list">
        {questions.map((question, index) => {
          const selectedAnswer = selectedAnswers[question.id];
          const hasAnswered = selectedAnswer !== undefined;

          return (
            <article className="api-question-card" key={question.id}>
              <p>
                Question {index + 1} · {question.category}
              </p>
              <h3>{question.question}</h3>

              <div className="answer-options">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = option === question.correctAnswer;
                  const isSelected = option === selectedAnswer;

                  const answerClass =
                    hasAnswered && isCorrect
                      ? "is-correct"
                      : hasAnswered && isSelected
                        ? "is-incorrect"
                        : "";

                  return (
                    <button
                      className={`answer-option ${answerClass}`}
                      disabled={hasAnswered}
                      key={option}
                      onClick={() => selectAnswer(question.id, option)}
                      type="button"
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <button
        className="outline-button load-more-button"
        disabled={isLoading || usingFallback}
        onClick={loadMoreQuestions}
        type="button"
      >
        {isLoading ? "Loading questions…" : "Load more questions"}
      </button>
    </section>
  );
}

export default ApiPractice;