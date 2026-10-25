export const codingQuestions = [
  {
    id: "two-sum",
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target value, return the indices of two numbers whose sum equals the target.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] equals 9.",
      },
    ],
    constraints: [
      "There is exactly one valid answer.",
      "You may not use the same element twice.",
    ],
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    topic: "Strings",
    difficulty: "Easy",
    description:
      "Check whether a string is a palindrome after converting uppercase letters to lowercase and ignoring non-alphanumeric characters.",
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: 'The cleaned string reads the same forwards and backwards.',
      },
    ],
    constraints: [
      "The input may contain letters, numbers, spaces, and punctuation.",
      "Comparison should be case-insensitive.",
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    topic: "Searching",
    difficulty: "Easy",
    description:
      "Given a sorted array of integers and a target value, return the target index. Return -1 if the target is not present.",
    examples: [
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        output: "4",
        explanation: "The value 9 is located at index 4.",
      },
    ],
    constraints: [
      "The input array is sorted in ascending order.",
      "Aim for logarithmic search time.",
    ],
  },
  {
    id: "sort-colors",
    title: "Sort Colors",
    topic: "Sorting",
    difficulty: "Medium",
    description:
      "Sort an array containing only 0, 1, and 2 so that identical values are grouped together.",
    examples: [
      {
        input: "nums = [2, 0, 2, 1, 1, 0]",
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: "The array is rearranged in ascending order.",
      },
    ],
    constraints: [
      "Do not use a built-in sorting function.",
      "Try to solve it with constant extra space.",
    ],
  },
  {
    id: "factorial-recursion",
    title: "Factorial Using Recursion",
    topic: "Recursion",
    difficulty: "Easy",
    description:
      "Write a recursive function that returns the factorial of a non-negative integer n.",
    examples: [
      {
        input: "n = 5",
        output: "120",
        explanation: "5 × 4 × 3 × 2 × 1 = 120.",
      },
    ],
    constraints: [
      "n is a non-negative integer.",
      "Define a suitable base case.",
    ],
  },
  {
    id: "reverse-linked-list",
    title: "Reverse a Linked List",
    topic: "Linked Lists",
    difficulty: "Medium",
    description:
      "Reverse a singly linked list and return the new head of the reversed list.",
    examples: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
        explanation: "The direction of every link is reversed.",
      },
    ],
    constraints: [
      "The list may be empty.",
      "Use an iterative or recursive approach.",
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stacks and Queues",
    difficulty: "Easy",
    description:
      "Check whether a string containing brackets has valid opening and closing pairs in the correct order.",
    examples: [
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Every opening bracket has the correct closing bracket.",
      },
    ],
    constraints: [
      "The string contains only parentheses, brackets, and braces.",
      "Use a stack-based approach.",
    ],
  },
  {
    id: "first-unique-character",
    title: "First Unique Character",
    topic: "Hashing",
    difficulty: "Medium",
    description:
      "Return the index of the first character in a string that appears only once. Return -1 if every character repeats.",
    examples: [
      {
        input: 's = "leetcode"',
        output: "0",
        explanation: 'The character "l" appears only once and is at index 0.',
      },
    ],
    constraints: [
      "The input is a lowercase English string.",
      "Use a frequency map to count character occurrences.",
    ],
  },
];