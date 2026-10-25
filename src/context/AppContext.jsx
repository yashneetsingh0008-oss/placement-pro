// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
// } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";

// const AppContext = createContext(null);

// const initialProgress = {
//   aptitudeAnswers: {},
//   codingStatus: {},
//   codingBookmarks: [],
//   technicalReviewed: [],
//   technicalBookmarks: [],
//   mockTestResults: [],
//   interviewBookmarks: [],
//   interviewChecklist: [],
//   companyChecklists: {},
// };

// export function AppProvider({ children }) {
//   const [progress, setProgress, removeProgress] = useLocalStorage(
//     "placement-pro-progress",
//     initialProgress
//   );

//   const updateProgress = useCallback(
//     (updater) => {
//       setProgress((currentProgress) => updater(currentProgress));
//     },
//     [setProgress]
//   );

//   const resetProgress = useCallback(() => {
//     removeProgress();
//   }, [removeProgress]);

//   const value = useMemo(
//   () => ({
//     progress,
//     updateProgress,
//     resetProgress,
//     theme,
//     setTheme,
//   }),
//   [progress, resetProgress, setTheme, theme, updateProgress]
// );
//   const [theme, setTheme] = useLocalStorage("placement-pro-theme", "light");

// useEffect(() => {
//   document.documentElement.dataset.theme = theme;
// }, [theme]);

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// }

// export function useAppContext() {
//   const context = useContext(AppContext);

//   if (!context) {
//     throw new Error("useAppContext must be used inside AppProvider.");
//   }

//   return context;
// }

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const initialProgress = {
  aptitudeAnswers: {},
  codingStatus: {},
  codingBookmarks: [],
  technicalReviewed: [],
  technicalBookmarks: [],
  mockTestResults: [],
  interviewBookmarks: [],
  interviewChecklist: [],
  companyChecklists: {},
};

export function AppProvider({ children }) {
  const [progress, setProgress] = useLocalStorage(
    "placement-pro-progress",
    initialProgress
  );

  const [theme, setTheme] = useLocalStorage(
    "placement-pro-theme",
    "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const updateProgress = useCallback(
    (updater) => {
      setProgress((currentProgress) => updater(currentProgress));
    },
    [setProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [setProgress]);

  const value = useMemo(
    () => ({
      progress,
      updateProgress,
      resetProgress,
      theme,
      setTheme,
    }),
    [progress, resetProgress, setTheme, theme, updateProgress]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider.");
  }

  return context;
}