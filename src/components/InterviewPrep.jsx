import { useState } from "react";
import {
  hrInterviewQuestions,
  interviewChecklist,
  resumeTips,
  selfIntroductionSteps,
  starMethodSteps,
} from "../data/interviewPrepData";
import { useAppContext } from "../context/AppContext";

function InterviewPrep() {
  const [activeTab, setActiveTab] = useState("hr");
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const { progress, updateProgress } = useAppContext();
  const bookmarkedIds = progress.interviewBookmarks || [];
  const completedChecklist = progress.interviewChecklist || [];

  const checklistPercentage = Math.round(
    (completedChecklist.length / interviewChecklist.length) * 100
  );

  function toggleBookmark(questionId) {
  updateProgress((currentProgress) => {
    const currentBookmarks = currentProgress.interviewBookmarks || [];

    return {
      ...currentProgress,
      interviewBookmarks: currentBookmarks.includes(questionId)
        ? currentBookmarks.filter((id) => id !== questionId)
        : [...currentBookmarks, questionId],
    };
  });
}

  function toggleChecklistItem(item) {
  updateProgress((currentProgress) => {
    const currentItems = currentProgress.interviewChecklist || [];

    return {
      ...currentProgress,
      interviewChecklist: currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    };
  });
}

  return (
    <section className="interview-prep">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">INTERVIEW READINESS</p>
          <h2>Interview Preparation</h2>
          <p>
            Prepare clear answers, organize your resume, and build confidence
            for behavioral and HR conversations.
          </p>
        </div>
      </div>

      <div className="interview-tabs" role="tablist" aria-label="Interview preparation sections">
        <button
          aria-selected={activeTab === "hr"}
          className={activeTab === "hr" ? "is-active" : ""}
          onClick={() => setActiveTab("hr")}
          role="tab"
          type="button"
        >
          HR Questions
        </button>

        <button
          aria-selected={activeTab === "introduction"}
          className={activeTab === "introduction" ? "is-active" : ""}
          onClick={() => setActiveTab("introduction")}
          role="tab"
          type="button"
        >
          Self Introduction
        </button>

        <button
          aria-selected={activeTab === "star"}
          className={activeTab === "star" ? "is-active" : ""}
          onClick={() => setActiveTab("star")}
          role="tab"
          type="button"
        >
          STAR Method
        </button>

        <button
          aria-selected={activeTab === "resume"}
          className={activeTab === "resume" ? "is-active" : ""}
          onClick={() => setActiveTab("resume")}
          role="tab"
          type="button"
        >
          Resume Tips
        </button>

        <button
          aria-selected={activeTab === "checklist"}
          className={activeTab === "checklist" ? "is-active" : ""}
          onClick={() => setActiveTab("checklist")}
          role="tab"
          type="button"
        >
          Checklist
        </button>
      </div>

      <div className="interview-tab-content">
        {activeTab === "hr" && (
          <div className="technical-question-list">
            {hrInterviewQuestions.map((item) => {
              const isOpen = openQuestionId === item.id;
              const isBookmarked = bookmarkedIds.includes(item.id);

              return (
                <article className="technical-question-item" key={item.id}>
                  <button
                    aria-controls={`hr-answer-${item.id}`}
                    aria-expanded={isOpen}
                    className="technical-question-button"
                    onClick={() =>
                      setOpenQuestionId((currentId) =>
                        currentId === item.id ? null : item.id
                      )
                    }
                    type="button"
                  >
                    <span>
                      <small>HR INTERVIEW QUESTION</small>
                      {item.question}
                    </span>
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="technical-answer" id={`hr-answer-${item.id}`}>
                      <p>{item.guidance}</p>

                      <button
                        aria-pressed={isBookmarked}
                        className={`bookmark-button ${
                          isBookmarked ? "is-bookmarked" : ""
                        }`}
                        onClick={() => toggleBookmark(item.id)}
                        type="button"
                      >
                        {isBookmarked ? "★ Saved for revision" : "☆ Bookmark"}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {activeTab === "introduction" && (
          <div className="introduction-steps">
            {selfIntroductionSteps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "star" && (
          <div className="star-grid">
            {starMethodSteps.map((step) => (
              <article key={step.letter}>
                <span>{step.letter}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "resume" && (
          <article className="resume-tips-card">
            <h3>Resume preparation tips</h3>
            <ul>
              {resumeTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        )}

        {activeTab === "checklist" && (
          <article className="company-checklist-card">
            <div className="checklist-heading">
              <div>
                <h2>Interview readiness checklist</h2>
                <p>Complete each item before your interview.</p>
              </div>
              <strong>{checklistPercentage}%</strong>
            </div>

            <progress max="100" value={checklistPercentage}>
              {checklistPercentage}%
            </progress>

            <div className="checklist-items">
              {interviewChecklist.map((item) => {
                const isComplete = completedChecklist.includes(item);

                return (
                  <label
                    className={isComplete ? "is-complete" : ""}
                    key={item}
                  >
                    <input
                      checked={isComplete}
                      onChange={() => toggleChecklistItem(item)}
                      type="checkbox"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

export default InterviewPrep;