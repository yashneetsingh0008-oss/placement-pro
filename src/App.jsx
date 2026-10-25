// import ActivityPanel from "./components/ActivityPanel";
// import FeatureCard from "./components/FeatureCard";
// import ProgressBar from "./components/ProgressBar";
// import AptitudePractice from "./components/AptitudePractice";
// import {
//   bookmarkedResources,
//   dashboardModules,
//   dashboardStats,
//   recentAttempts,
//   topicProgress,
// } from "./data/dashboardData";
// import "./styles/global.css";


// function App() {
//   return (
//     <div className="app-shell">
//       <header className="site-header">
//         <a className="brand" href="#home" aria-label="Placement Pro home">
//           <span className="brand-mark">P</span>
//           <span>
//             Placement <strong>Pro</strong>
//           </span>
//         </a>

//         <nav className="main-nav" aria-label="Main navigation">
//           <a href="#dashboard">Dashboard</a>
//           <a href="#practice">Practice</a>
//           <a href="#progress">Progress</a>
//         </nav>

//         <button className="outline-button" type="button">
//           My Profile
//         </button>
//       </header>

//       <main id="home">
//         <section className="hero-section">
//           <div>
//             <p className="eyebrow">YOUR PLACEMENT PREP, ORGANIZED</p>
//             <h1>Prepare with focus. Perform with confidence.</h1>
//             <p className="hero-text">
//               Practice aptitude, sharpen coding skills, and prepare for interviews
//               from one focused learning dashboard.
//             </p>
//             <button className="primary-button" type="button">
//               Start Practicing
//             </button>
//           </div>

//           <aside className="goal-card" aria-label="Today’s practice goal">
//             <p className="card-label">TODAY&apos;S GOAL</p>
//             <h2>30 minutes</h2>
//             <div className="progress-track" aria-label="40 percent complete">
//               <span className="progress-fill" />
//             </div>
//             <p>12 of 30 minutes completed</p>
//           </aside>
//         </section>
//         <section className="dashboard-overview" id="dashboard">
//   <div className="stats-grid">
//     {dashboardStats.map((stat) => (
//       <article className="stat-card" key={stat.label}>
//         <strong>{stat.value}</strong>
//         <span>{stat.label}</span>
//       </article>
//     ))}
//   </div>

//   <article className="overall-progress-card">
//     <div>
//       <p className="eyebrow">YOUR PREPARATION</p>
//       <h2>Keep building your momentum</h2>
//       <p>
//         Your practice activity is shown by topic. Small, consistent sessions
//         add up.
//       </p>
//     </div>

//     <div className="topic-progress-list">
//       {topicProgress.map((item) => (
//         <div className="topic-progress-item" key={item.topic}>
//           <div className="topic-progress-label">
//             <span>{item.topic}</span>
//             <strong>{item.value}%</strong>
//           </div>
//           <ProgressBar value={item.value} />
//         </div>
//       ))}
//     </div>
//   </article>
// </section>

//         <section className="module-section" id="practice">
//           <section className="activity-section">
//   <ActivityPanel
//     title="Recently Attempted"
//     description="Pick up where you left off."
//     items={recentAttempts}
//     actionLabel="View all"
    
//   />

//   <ActivityPanel
//     title="Bookmarks"
//     description="Your saved resources for revision."
//     items={bookmarkedResources}
//     actionLabel="View all"
//   />
//   <AptitudePractice />
// </section>
//           <div className="section-heading">
//             <div>
//               <p className="eyebrow">PREPARE YOUR WAY</p>
//               <h2>Everything you need in one place</h2>
//             </div>
//             <p>Choose a learning area and make every practice session count.</p>
//           </div>

//           <div className="module-grid">
//             {dashboardModules.map((module) => (
//               <FeatureCard key={module.title} {...module} />
//             ))}
//           </div>
//         </section>
//       </main>
//       <footer className="site-footer">
//   <p>© 2026 Placement Pro. Built for focused placement preparation.</p>
//   <a href="#home">Back to top ↑</a>
// </footer>
//     </div>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Aptitude from "./pages/Aptitude";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Coding from "./pages/Coding";
import CodingDetails from "./pages/CodingDetails";
import TechnicalInterviewPage from "./pages/TechnicalInterview";
import Companies from "./pages/Companies";
import CompanyDetailsPage from "./pages/CompanyDetails";
import MockTestDetails from "./pages/MockTestDetails";
import MockTests from "./pages/MockTests";
import InterviewPrepPage from "./pages/InterviewPrep";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import BonusQuiz from "./pages/BonusQuiz";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route index element={<Home />} />
        <Route element={<Aptitude />} path="aptitude" />
        <Route element={<NotFound />} path="*" />
        <Route element={<Coding />} path="coding" />
        <Route element={<CodingDetails />} path="coding/:questionId" />
        <Route element={<TechnicalInterviewPage />} path="technical-interview" />
        <Route element={<Companies />} path="companies" />
        <Route element={<CompanyDetailsPage />} path="companies/:companyId" />
        <Route element={<MockTests />} path="mock-tests" />
        <Route element={<MockTestDetails />} path="mock-tests/:testId" />
        <Route element={<InterviewPrepPage />} path="interview-prep" />
        <Route element={<Profile />} path="profile" />
        <Route element={<Progress />} path="progress" />
        <Route path="bonus-quiz" element={<BonusQuiz />} />
      </Route>
    </Routes>
  );
}

export default App;