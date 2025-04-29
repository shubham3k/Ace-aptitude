import { create } from 'zustand';
import { Question, Test } from '@/types'; // Import your types

// Define the state structure
interface ExamState {
  testDetails: Test | null;        // Details of the current test
  questions: Question[];          // Array of questions for the current exam
  currentQuestionIndex: number;  // Index of the currently displayed question
  userAnswers: Record<string, number>; // { questionId: selectedOptionIndex }
  markedForReview: string[];      // Array of question IDs marked for review
  isLoading: boolean;             // Loading state for fetching questions
  error: string | null;           // Error message if fetching fails
  startTime: number | null;       // Timestamp when the exam started (for timer)
  isSubmitted: boolean;           // Flag if the exam has been submitted
}

// Define the actions available on the store
interface ExamActions {
  startLoading: () => void;
  setExamData: (testDetails: Test, questions: Question[]) => void;
  setError: (error: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  answerQuestion: (questionId: string, answerIndex: number) => void;
  toggleMarkForReview: (questionId: string) => void;
  startExam: (testDetails: Test, questions: Question[]) => void; // Combined starting action
  submitExam: () => void; // Placeholder for submission logic
  resetExamState: () => void; // To clear state after finishing or leaving
}

// Define the initial state
const initialState: ExamState = {
  testDetails: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  markedForReview: [],
  isLoading: true, // Start in loading state initially
  error: null,
  startTime: null,
  isSubmitted: false,
};

// Create the Zustand store
export const useExamStore = create<ExamState & ExamActions>((set, get) => ({
  ...initialState, // Spread the initial state

  // --- Actions ---
  startLoading: () => set({ isLoading: true, error: null }),

  setExamData: (testDetails, questions) => set({
      testDetails,
      questions,
      isLoading: false,
      error: null,
      currentQuestionIndex: 0, // Reset index when new data loads
      userAnswers: {},         // Clear previous answers
      markedForReview: [],   // Clear previous marks
      isSubmitted: false,      // Reset submission status
      startTime: Date.now(),   // Record the start time
  }),

  setError: (error) => set({ error, isLoading: false }),

  setCurrentQuestionIndex: (index) => {
      const questions = get().questions;
      // Basic bounds checking
      if (index >= 0 && index < questions.length) {
          set({ currentQuestionIndex: index });
      }
  },

  answerQuestion: (questionId, answerIndex) => set((state) => ({
      userAnswers: {
          ...state.userAnswers,
          [questionId]: answerIndex,
      },
  })),

  toggleMarkForReview: (questionId) => set((state) => {
      const newMarked = new Set(state.markedForReview);
      if (newMarked.has(questionId)) {
          newMarked.delete(questionId);
      } else {
          newMarked.add(questionId);
      }
      return { markedForReview: Array.from(newMarked) };
  }),

  // Combined action to fetch and set data (will be called from the page component)
  startExam: (testDetails: Test, questions: Question[]) => {
     get().setExamData(testDetails, questions);
     // Potentially call other init logic here
  },

  submitExam: () => {
     // Logic for submission will be added on Day 8
     // This will involve calculating score, preparing data, calling Appwrite createDocument
     set({ isSubmitted: true });
     console.log("Exam submitted (placeholder)");
     console.log("User Answers:", get().userAnswers);
  },

  resetExamState: () => set({ ...initialState, isLoading: false }), // Reset but keep loading false
}));