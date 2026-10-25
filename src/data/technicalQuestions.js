export const technicalQuestions = [
  {
    id: "js-closure",
    category: "JavaScript",
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is created when a function remembers and can access variables from its outer lexical scope, even after the outer function has finished running. Closures are commonly used for private state, callbacks, and function factories.",
  },
  {
    id: "js-let-var-const",
    category: "JavaScript",
    question: "What is the difference between let, const, and var?",
    answer:
      "var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is also block-scoped but cannot be reassigned after it is declared. In modern JavaScript, prefer const by default and let when a value must change.",
  },
  {
    id: "html-semantic",
    category: "HTML and CSS",
    question: "Why are semantic HTML elements important?",
    answer:
      "Semantic elements such as header, nav, main, section, article, and footer describe the purpose of content. They improve accessibility for screen readers, make code easier to understand, and can help search engines interpret the page structure.",
  },
  {
    id: "css-flex-grid",
    category: "HTML and CSS",
    question: "When should you use Flexbox and when should you use CSS Grid?",
    answer:
      "Use Flexbox for one-dimensional layouts, such as arranging items in a row or column. Use CSS Grid for two-dimensional layouts where both rows and columns need control, such as a dashboard card layout.",
  },
  {
    id: "react-state",
    category: "React Fundamentals",
    question: "What is state in React?",
    answer:
      "State is data managed by a component that can change over time. When state changes through its setter function, React re-renders the component so the user interface reflects the latest data.",
  },
  {
    id: "react-props",
    category: "React Fundamentals",
    question: "What is the difference between props and state?",
    answer:
      "Props are values passed from a parent component to a child component and should not be changed by the child. State is managed inside a component and can change in response to user actions or other events.",
  },
  {
    id: "oop-encapsulation",
    category: "Object-Oriented Programming",
    question: "What is encapsulation in object-oriented programming?",
    answer:
      "Encapsulation means combining data and the methods that work with that data into one unit, such as an object or class. It also helps control direct access to internal data through a clear public interface.",
  },
  {
    id: "oop-polymorphism",
    category: "Object-Oriented Programming",
    question: "What is polymorphism?",
    answer:
      "Polymorphism allows the same method or interface to behave differently depending on the object using it. For example, different classes can provide their own version of a method with the same name.",
  },
  {
    id: "dbms-primary-key",
    category: "DBMS and SQL",
    question: "What is a primary key in a database table?",
    answer:
      "A primary key is a column, or a group of columns, that uniquely identifies every row in a table. Primary-key values must be unique and cannot be null.",
  },
  {
    id: "sql-join",
    category: "DBMS and SQL",
    question: "What is an INNER JOIN in SQL?",
    answer:
      "An INNER JOIN returns rows where there is a matching value in both joined tables. Rows without a match in either table are not included in the result.",
  },
  {
    id: "os-process-thread",
    category: "Operating Systems",
    question: "What is the difference between a process and a thread?",
    answer:
      "A process is an independent program in execution with its own memory space. A thread is a smaller unit of execution inside a process. Threads in the same process can share memory and resources.",
  },
  {
    id: "os-deadlock",
    category: "Operating Systems",
    question: "What is deadlock?",
    answer:
      "Deadlock is a situation where two or more processes wait indefinitely for resources held by one another. As a result, none of the processes can continue.",
  },
  {
    id: "network-tcp-udp",
    category: "Computer Networks",
    question: "What is the difference between TCP and UDP?",
    answer:
      "TCP is connection-oriented and provides reliable, ordered delivery of data. UDP is connectionless and faster but does not guarantee delivery, order, or duplicate protection.",
  },
  {
    id: "network-dns",
    category: "Computer Networks",
    question: "What is DNS?",
    answer:
      "DNS stands for Domain Name System. It translates human-readable domain names, such as example.com, into IP addresses that computers use to communicate over a network.",
  },
];