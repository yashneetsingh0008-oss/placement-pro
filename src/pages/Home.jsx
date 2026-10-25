import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ActivityPanel from "../components/ActivityPanel";
import FeatureCard from "../components/FeatureCard";
import ProgressBar from "../components/ProgressBar";
import { aptitudeQuestions } from "../data/aptitudeQuestions";
import { codingQuestions } from "../data/codingQuestions";
import { dashboardModules } from "../data/dashboardData";
import { hrInterviewQuestions } from "../data/interviewPrepData";
import { technicalQuestions } from "../data/technicalQuestions";

function Home() {
  const { progress } = useAppContext();

  const aptitudeAnswers = progress.aptitudeAnswers || {};
  const codingStatus = progress.codingStatus || {};

  const aptitudeAttempted = Object.keys(aptitudeAnswers).length;
  const aptitudeCorrect = aptitudeQuestions.filter(
    (question) => aptitudeAnswers[question.id] === question.correctAnswer
  ).length;

  const codingAttempted = Object.values(codingStatus).filter(
    (status) => status === "Attempted" || status === "Solved"
  ).length;

  const codingSolved = Object.values(codingStatus).filter(
    (status) => status === "Solved"
  ).length;

  const technicalReviewed = (progress.technicalReviewed || []).length;
  const mockTestsCompleted = (progress.mockTestResults || []).length;

  const dashboardStats = [
    {
      value: aptitudeAttempted + codingAttempted,
      label: "Questions attempted",
    },
    {
      value: aptitudeCorrect + codingSolved,
      label: "Correct or solved",
    },
    {
      value: mockTestsCompleted,
      label: "Mock tests completed",
    },
  ];

  const topicProgress = [
    {
      topic: "Aptitude",
      value: Math.round(
        (aptitudeAttempted / aptitudeQuestions.length) * 100
      ),
    },
    {
      topic: "Coding",
      value: Math.round((codingSolved / codingQuestions.length) * 100),
    },
    {
      topic: "Technical Interview",
      value: Math.round(
        (technicalReviewed / technicalQuestions.length) * 100
      ),
    },
  ];

  const practiceActivity = [
    ...aptitudeQuestions
      .filter((question) => aptitudeAnswers[question.id] !== undefined)
      .map((question) => ({
        title: question.question,
        meta: `Aptitude · ${question.category}`,
        status: "Attempted",
      })),
    ...codingQuestions
      .filter((question) => codingStatus[question.id])
      .map((question) => ({
        title: question.title,
        meta: `Coding · ${question.topic}`,
        status: codingStatus[question.id],
      })),
  ].slice(0, 3);

  const bookmarkItems = [
    ...codingQuestions
      .filter((question) =>
        (progress.codingBookmarks || []).includes(question.id)
      )
      .map((question) => ({
        title: question.title,
        meta: `Coding · ${question.topic}`,
        status: "Bookmarked",
      })),
    ...technicalQuestions
      .filter((question) =>
        (progress.technicalBookmarks || []).includes(question.id)
      )
      .map((question) => ({
        title: question.question,
        meta: `Technical Interview · ${question.category}`,
        status: "Bookmarked",
      })),
    ...hrInterviewQuestions
      .filter((question) =>
        (progress.interviewBookmarks || []).includes(question.id)
      )
      .map((question) => ({
        title: question.question,
        meta: "Interview Preparation",
        status: "Bookmarked",
      })),
  ].slice(0, 3);

  const displayedActivity =
    practiceActivity.length > 0
      ? practiceActivity
      : [
          {
            title: "No practice activity yet",
            meta: "Start an aptitude or coding session to track it here.",
            status: "Ready",
          },
        ];

  const displayedBookmarks =
    bookmarkItems.length > 0
      ? bookmarkItems
      : [
          {
            title: "No bookmarks yet",
            meta: "Save useful coding, technical, or HR questions for revision.",
            status: "Ready",
          },
        ];

  return (
    <div id="home">
      <section className="hero-section">
        <div>
          <p className="eyebrow">YOUR PLACEMENT PREP, ORGANIZED</p>
          <h1>Prepare with focus. Perform with confidence.</h1>
          <p className="hero-text">
            Practice aptitude, sharpen coding skills, and prepare for interviews
            from one focused learning dashboard.
          </p>

          <Link className="primary-button" to="/aptitude">
            Start Practicing
          </Link>
        </div>

        <aside className="goal-card" aria-label="Today’s practice goal">
          <p className="card-label">TODAY&apos;S GOAL</p>
          <h2>30 minutes</h2>
          <div className="progress-track" aria-label="40 percent complete">
            <span className="progress-fill" />
          </div>
          <p>Set your daily goal in Profile settings.</p>
        </aside>
      </section>

      <section className="dashboard-overview" id="dashboard">
        <div className="stats-grid">
          {dashboardStats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <article className="overall-progress-card">
          <div>
            <p className="eyebrow">YOUR PREPARATION</p>
            <h2>Keep building your momentum</h2>
            <p>
              Your progress updates as you practice across Placement Pro.
            </p>
          </div>

          <div className="topic-progress-list">
            {topicProgress.map((item) => (
              <div className="topic-progress-item" key={item.topic}>
                <div className="topic-progress-label">
                  <span>{item.topic}</span>
                  <strong>{item.value}%</strong>
                </div>
                <ProgressBar value={item.value} />
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="module-section" id="practice">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PREPARE YOUR WAY</p>
            <h2>Everything you need in one place</h2>
          </div>
          <p>Choose a learning area and make every practice session count.</p>
        </div>

        <div className="module-grid">
          {dashboardModules.map((module) => (
            <FeatureCard key={module.title} {...module} />
          ))}
        </div>
      </section>

      <section className="activity-section">
        <ActivityPanel
          title="Practice Activity"
          description="Questions you have worked on in this browser."
          items={displayedActivity}
          actionLabel="View progress"
        />

        <ActivityPanel
          title="Bookmarks"
          description="Resources saved for your future revision."
          items={displayedBookmarks}
          actionLabel="View progress"
        />
      </section>
    </div>
  );
}

export default Home;