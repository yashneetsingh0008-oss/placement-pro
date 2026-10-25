







import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { aptitudeQuestions } from "../data/aptitudeQuestions";
import { codingQuestions } from "../data/codingQuestions";
import { interviewChecklist } from "../data/interviewPrepData";
import { technicalQuestions } from "../data/technicalQuestions";

function getPercentage(current, total) {
  if (total === 0) {
    return 0;
  }

  return Math.round((current / total) * 100);
}

function ProgressDashboard() {
  const { progress } = useAppContext();

  const aptitudeAnswers = progress.aptitudeAnswers || {};
  const codingStatus = progress.codingStatus || {};
  const mockResults = progress.mockTestResults || [];

  const aptitudeAttempted = Object.keys(aptitudeAnswers).length;
  const aptitudeCorrect = aptitudeQuestions.filter(
    (question) => aptitudeAnswers[question.id] === question.correctAnswer
  ).length;

  const codingSolved = Object.values(codingStatus).filter(
    (status) => status === "Solved"
  ).length;

  const codingAttempted = Object.values(codingStatus).filter(
    (status) => status === "Attempted" || status === "Solved"
  ).length;

  const technicalReviewed = (progress.technicalReviewed || []).length;
  const interviewCompleted = (progress.interviewChecklist || []).length;

  const mockQuestionsAttempted = mockResults.reduce(
    (total, result) => total + (result.answeredCount || 0),
    0
  );

  const mockCorrect = mockResults.reduce(
    (total, result) => total + result.score,
    0
  );

  const totalAttempted =
    aptitudeAttempted +
    codingAttempted +
    technicalReviewed +
    mockQuestionsAttempted;

  const totalSolved = aptitudeCorrect + codingSolved + mockCorrect;

  const totalBookmarks =
    (progress.codingBookmarks || []).length +
    (progress.technicalBookmarks || []).length +
    (progress.interviewBookmarks || []).length;

  const aptitudeAccuracy = getPercentage(aptitudeCorrect, aptitudeAttempted);

  const mockAverage =
    mockResults.length === 0
      ? 0
      : Math.round(
          mockResults.reduce(
            (total, result) =>
              total + getPercentage(result.score, result.totalQuestions),
            0
          ) / mockResults.length
        );

  const topicProgress = [
    {
      label: "Aptitude Practice",
      detail: `${aptitudeAttempted} of ${aptitudeQuestions.length} attempted`,
      value: getPercentage(aptitudeAttempted, aptitudeQuestions.length),
    },
    {
      label: "Coding Practice",
      detail: `${codingSolved} of ${codingQuestions.length} solved`,
      value: getPercentage(codingSolved, codingQuestions.length),
    },
    {
      label: "Technical Interview",
      detail: `${technicalReviewed} of ${technicalQuestions.length} reviewed`,
      value: getPercentage(technicalReviewed, technicalQuestions.length),
    },
    {
      label: "Interview Readiness",
      detail: `${interviewCompleted} of ${interviewChecklist.length} completed`,
      value: getPercentage(interviewCompleted, interviewChecklist.length),
    },
  ];

  return (
    <section className="progress-dashboard">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">YOUR LEARNING ACTIVITY</p>
          <h2>Progress Dashboard</h2>
          <p>
            This dashboard uses the practice activity saved locally in your
            browser.
          </p>
        </div>
      </div>

      <div className="progress-stats-grid">
        <article>
          <strong>{totalAttempted}</strong>
          <span>Questions attempted</span>
        </article>

        <article>
          <strong>{totalSolved}</strong>
          <span>Correct or solved</span>
        </article>

        <article>
          <strong>{totalBookmarks}</strong>
          <span>Bookmarks saved</span>
        </article>

        <article>
          <strong>{aptitudeAccuracy}%</strong>
          <span>Aptitude accuracy</span>
        </article>
      </div>

      <div className="progress-dashboard-grid">
        <article className="topic-progress-card">
          <h3>Topic-wise progress</h3>

          <div className="progress-topic-list">
            {topicProgress.map((topic) => (
              <div className="progress-topic-row" key={topic.label}>
                <div>
                  <strong>{topic.label}</strong>
                  <span>{topic.detail}</span>
                </div>

                <div>
                  <span>{topic.value}%</span>
                  <div className="topic-progress-bar">
                    <span
                      className="topic-progress-fill"
                      style={{ width: `${topic.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="mock-performance-card">
          <p className="eyebrow">MOCK-TEST PERFORMANCE</p>
          <strong>{mockAverage}%</strong>
          <span>average score</span>
          <p>
            {mockResults.length === 0
              ? "Complete a mock test to see your performance here."
              : `${mockResults.length} mock test${
                  mockResults.length === 1 ? "" : "s"
                } completed.`}
          </p>

          <Link className="outline-button" to="/mock-tests">
            Take a mock test
          </Link>
        </article>
      </div>

      <article className="next-step-card">
        <div>
          <p className="eyebrow">NEXT BEST STEP</p>
          <h3>
            {totalAttempted === 0
              ? "Start with a short aptitude practice session."
              : codingSolved === 0
                ? "Solve a coding question to build your coding progress."
                : "Continue your routine with a timed mock test."}
          </h3>
        </div>

        <Link className="primary-button" to="/aptitude">
          Practice now
        </Link>
      </article>
    </section>
  );
}

export default ProgressDashboard;