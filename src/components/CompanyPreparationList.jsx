import { companies } from "../data/companies";

function CompanyPreparationList({ onSelectCompany }) {
  return (
    <section className="company-preparation-list">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">TARGETED PREPARATION</p>
          <h2>Company-Wise Preparation</h2>
          <p>
            Explore general preparation plans for selected companies. These
            plans are learning guides, not official hiring-process information.
          </p>
        </div>
      </div>

      <div className="company-grid">
        {companies.map((company) => (
          <article className="company-card" key={company.id}>
            <div className="company-card-top">
              <span className="company-initial" aria-hidden="true">
                {company.name.charAt(0)}
              </span>
              <span className="company-category">{company.category}</span>
            </div>

            <h3>{company.name}</h3>
            <p>{company.summary}</p>

            <div className="company-focus">
              <h4>Recommended focus</h4>
              <ul>
                {company.codingFocus.slice(0, 2).map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>

            <button
              className="primary-button company-plan-button"
              onClick={() => onSelectCompany(company.id)}
              type="button"
            >
              View preparation plan →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CompanyPreparationList;