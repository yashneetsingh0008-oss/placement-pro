export const mockTests = [
  {
    id: "placement-foundations",
    title: "Placement Foundations Mock",
    description:
      "A short mixed test covering aptitude, coding concepts, and technical fundamentals.",
    durationMinutes: 15,
    questions: [
      {
        id: "foundation-1",
        section: "Quantitative Aptitude",
        question: "25% of a number is 50. What is the number?",
        options: ["100", "150", "200", "250"],
        correctAnswer: 2,
        explanation: "25% is one-fourth, so the number is 50 × 4 = 200.",
      },
      {
        id: "foundation-2",
        section: "Logical Reasoning",
        question: "Find the next number: 3, 6, 11, 18, ?",
        options: ["25", "27", "29", "31"],
        correctAnswer: 1,
        explanation:
          "The differences are +3, +5, +7, so the next difference is +9. Therefore, 18 + 9 = 27.",
      },
      {
        id: "foundation-3",
        section: "Coding Concepts",
        question: "What is the time complexity of binary search on a sorted array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 1,
        explanation:
          "Binary search halves the search range after each comparison, giving O(log n) time complexity.",
      },
      {
        id: "foundation-4",
        section: "JavaScript",
        question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "function"],
        correctAnswer: 2,
        explanation:
          "const creates a block-scoped binding that cannot be reassigned after declaration.",
      },
      {
        id: "foundation-5",
        section: "HTML and CSS",
        question: "Which semantic HTML element is intended for the main content of a page?",
        options: ["div", "main", "span", "aside"],
        correctAnswer: 1,
        explanation:
          "The main element represents the dominant content of the document body.",
      },
    ],
  },
  {
    id: "aptitude-speed-check",
    title: "Aptitude Speed Check",
    description:
      "A quick practice test to improve arithmetic, reasoning, and verbal-ability speed.",
    durationMinutes: 10,
    questions: [
      {
        id: "speed-1",
        section: "Quantitative Aptitude",
        question: "A train travels 120 km in 2 hours. What is its average speed?",
        options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
        correctAnswer: 2,
        explanation: "Average speed = distance ÷ time = 120 ÷ 2 = 60 km/h.",
      },
      {
        id: "speed-2",
        section: "Logical Reasoning",
        question: "If all roses are flowers and some flowers fade quickly, which statement is definitely true?",
        options: [
          "All flowers are roses.",
          "Some roses fade quickly.",
          "Roses are flowers.",
          "No roses fade quickly.",
        ],
        correctAnswer: 2,
        explanation:
          "The original statement directly confirms that every rose is a flower.",
      },
      {
        id: "speed-3",
        section: "Verbal Ability",
        question: "Choose the antonym of “expand.”",
        options: ["Increase", "Grow", "Reduce", "Develop"],
        correctAnswer: 2,
        explanation: "Reduce means to make something smaller, which is the opposite of expand.",
      },
      {
        id: "speed-4",
        section: "Quantitative Aptitude",
        question: "What is the simple interest on ₹1,000 at 10% per year for 2 years?",
        options: ["₹100", "₹150", "₹200", "₹250"],
        correctAnswer: 2,
        explanation:
          "Simple interest = principal × rate × time = 1,000 × 10% × 2 = ₹200.",
      },
    ],
  },
];