import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import FormField from "./FormField";
import useLocalStorage from "../hooks/useLocalStorage";
import { validateProfile } from "../utils/validation";

const defaultProfile = {
  fullName: "",
  email: "",
  course: "",
  graduationYear: "",
  targetRole: "",
  dailyGoal: "30",
};

function ProfileSettings() {
  const [profile, setProfile] = useLocalStorage(
    "placement-pro-profile",
    defaultProfile
  );
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const { resetProgress, setTheme, theme } = useAppContext();

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProfile(profile);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToastMessage("");
      return;
    }

    setToastMessage("Your profile has been saved on this device.");
  }

  function handleResetProgress() {
    resetProgress();
    setIsResetModalOpen(false);
    setToastMessage("Your saved preparation progress has been reset.");
  }

  return (
    <section className="profile-settings">
      <div className="company-list-heading">
        <div>
          <p className="eyebrow">LOCAL PROFILE</p>
          <h2>Your Profile and Settings</h2>
          <p>
            Your profile and progress are stored only in this browser. This
            frontend demonstration does not create an online account.
          </p>
        </div>
      </div>

      <form className="profile-form" noValidate onSubmit={handleSubmit}>
        <div className="profile-form-grid">
          <FormField
            autoComplete="name"
            error={errors.fullName}
            id="fullName"
            label="Full name"
            name="fullName"
            onChange={handleChange}
            placeholder="Enter your full name"
            type="text"
            value={profile.fullName}
          />

          <FormField
            autoComplete="email"
            error={errors.email}
            id="email"
            label="Email address"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            value={profile.email}
          />

          <FormField
            error={errors.course}
            id="course"
            label="Course or degree"
            name="course"
            onChange={handleChange}
            placeholder="For example: B.Tech Computer Science"
            type="text"
            value={profile.course}
          />

          <FormField
            error={errors.graduationYear}
            id="graduationYear"
            label="Graduation year"
            max="2035"
            min="2024"
            name="graduationYear"
            onChange={handleChange}
            placeholder="2027"
            type="number"
            value={profile.graduationYear}
          />

          <FormField
            error={errors.dailyGoal}
            id="dailyGoal"
            label="Daily practice goal in minutes"
            max="240"
            min="10"
            name="dailyGoal"
            onChange={handleChange}
            type="number"
            value={profile.dailyGoal}
          />

          <FormField
            error={errors.targetRole}
            id="targetRole"
            label="Target role (optional)"
            name="targetRole"
            onChange={handleChange}
            placeholder="For example: Frontend Developer"
            type="text"
            value={profile.targetRole}
          />
        </div>

        <button className="primary-button profile-save-button" type="submit">
          Save profile
        </button>
      </form>

      <section className="settings-card">
        <div>
          <h3>Appearance</h3>
          <p>Choose the theme used by Placement Pro on this browser.</p>
        </div>

        <label className="theme-select" htmlFor="theme">
          Theme
          <select
            id="theme"
            onChange={(event) => setTheme(event.target.value)}
            value={theme}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </section>

      <section className="settings-card danger-zone">
        <div>
          <h3>Reset preparation progress</h3>
          <p>
            This clears saved answers, coding statuses, bookmarks, mock-test
            results, and checklists. Your profile information is kept.
          </p>
        </div>

        <button
          className="danger-button"
          onClick={() => setIsResetModalOpen(true)}
          type="button"
        >
          Reset progress
        </button>
      </section>

      {toastMessage && (
        <div className="success-toast" role="status">
          <span aria-hidden="true">✓</span>
          {toastMessage}
        </div>
      )}

      {isResetModalOpen && (
        <div className="modal-backdrop">
          <div
            aria-labelledby="reset-progress-heading"
            aria-modal="true"
            className="confirmation-modal"
            role="dialog"
          >
            <h2 id="reset-progress-heading">Reset all progress?</h2>
            <p>
              This will remove your saved practice activity from this browser.
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                className="outline-button"
                onClick={() => setIsResetModalOpen(false)}
                type="button"
              >
                Cancel
              </button>

              <button
                className="danger-button"
                onClick={handleResetProgress}
                type="button"
              >
                Yes, reset progress
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfileSettings;