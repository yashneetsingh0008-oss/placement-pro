export function validateProfile(profile) {
  const errors = {};

  if (profile.fullName.trim().length < 2) {
    errors.fullName = "Enter at least 2 characters for your name.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(profile.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (profile.course.trim().length < 2) {
    errors.course = "Enter your course or degree name.";
  }

  const graduationYear = Number(profile.graduationYear);

  if (
    !Number.isInteger(graduationYear) ||
    graduationYear < 2024 ||
    graduationYear > 2035
  ) {
    errors.graduationYear = "Enter a graduation year from 2024 to 2035.";
  }

  const dailyGoal = Number(profile.dailyGoal);

  if (!Number.isInteger(dailyGoal) || dailyGoal < 10 || dailyGoal > 240) {
    errors.dailyGoal = "Choose a daily goal between 10 and 240 minutes.";
  }

  return errors;
}