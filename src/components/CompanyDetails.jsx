import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function CompanyDetails({ company }) {
  const companyId = company ? company.id : "";

  const [activeTab, setActiveTab] = useState("focus");
  const { progress, updateProgress } = useAppContext();
  const completedChecklist =
  progress.companyChecklists?.[companyId] || [];

  useEffect(() => {
    setActiveTab("focus");
    
  }, [companyId]);

  if (!company) {
    return (
      <section className="company-detail-empty">
        <h2>Company not found</h2>
        <p>Please choose a company from the preparation list.</p>
      </section>
    );
  }

  const completionPercentage = Math.round(
    (completedChecklist.length / company.checklist.length) * 100
  );

  function toggleChecklistItem(item) {
  updateProgress((currentProgress) => {
    const currentChecklists = currentProgress.companyChecklists || {};
    const currentItems = currentChecklists[companyId] || [];

    return {
      ...currentProgress,
      companyChecklists: {
        ...currentChecklists,
        [companyId]: currentItems.includes(item)
          ? currentItems.filter((currentItem) => currentItem !== item)
          : [...currentItems, item],
      },
    };
  });
}

  return (
    <section className="company-details">
      <p className="detail-breadcrumb">
        Company Preparation <span>/</span> {company.name}
      </p>

      <header className="company-detail-header">
        <span className="company-detail-mark" aria-hidden="true">
          {company.name.charAt(0)}
        </span>

        <div>
          <p className="eyebrow">{company.category}</p>
          <h1>{company.name} Preparation Plan</h1>
          <p>{company.summary}</p>
        </div>
      </header>

      <div className="company-tabs" role="tablist" aria-label="Preparation sections">
        <button
          aria-selected={activeTab === "focus"}
          className={activeTab === "focus" ? "is-active" : ""}
          onClick={() => setActiveTab("focus")}
          role="tab"
          type="button"
        >
          Practice Focus
        </button>

        <button
          aria-selected={activeTab === "interview"}
          className={activeTab === "interview" ? "is-active" : ""}
          onClick={() => setActiveTab("interview")}
          role="tab"
          type="button"
        >
          Technical and HR
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

      <div className="company-tab-content">
        {activeTab === "focus" && (
          <div className="company-focus-grid">
            <article>
              <h2>Aptitude focus</h2>
              <ul>
                {company.aptitudeFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article>
              <h2>Coding focus</h2>
              <ul>
                {company.codingFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        )}

        {activeTab === "interview" && (
          <div className="company-focus-grid">
            <article>
              <h2>Technical revision</h2>
              <ul>
                {company.technicalFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article>
              <h2>HR questions to practice</h2>
              <ol>
                {company.hrQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </article>
          </div>
        )}

        {activeTab === "checklist" && (
          <article className="company-checklist-card">
            <div className="checklist-heading">
              <div>
                <h2>Preparation checklist</h2>
                <p>Track the steps you have completed for this plan.</p>
              </div>
              <strong>{completionPercentage}%</strong>
            </div>

            <progress max="100" value={completionPercentage}>
              {completionPercentage}%
            </progress>

            <div className="checklist-items">
              {company.checklist.map((item) => {
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

export default CompanyDetails;