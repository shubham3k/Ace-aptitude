'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use useParams for client components
import { databases, DB_ID, TESTS_COLLECTION_ID, QUESTIONS_COLLECTION_ID } from '@/lib/appwrite';
import { useExamStore } from '@/store/examStore';
import { Question, Test } from '@/types';
import { Query } from 'appwrite';
import { QuestionDisplay } from '@/components/features/exam/QuestionDisplay'; // We'll create this next
// import ExamTimer from '@/components/features/exam/ExamTimer'; // Placeholder
// import QuestionNavigator from '@/components/features/exam/QuestionNavigator'; // Placeholder

export default function ExamPage() {
  const params = useParams(); // Get route parameters (client-side)
  const testId = params.testId as string; // Extract testId
  const router = useRouter();

  // Get state and actions from Zustand store
  const {
    questions,
    currentQuestionIndex,
    isLoading,
    error,
    startLoading,
    startExam, // Use the combined action
    setError,
    resetExamState,
    testDetails, // Get testDetails for duration etc. later
  } = useExamStore();

  // Effect to fetch exam data when the component mounts or testId changes
  useEffect(() => {
    if (!testId) return; // Don't fetch if testId isn't available yet

    startLoading();
    console.log('Fetching exam data for test:', testId);

    const fetchExamData = async () => {
      try {
        // 1. Fetch Test details (needed for questionIds and maybe duration)
        const fetchedTestDetails = await databases.getDocument<Test>(
          DB_ID,
          TESTS_COLLECTION_ID,
          testId
        );
        console.log('Fetched test details:', fetchedTestDetails);

        if (!fetchedTestDetails || !fetchedTestDetails.isEnabled) {
          throw new Error("Test not found or is disabled.");
        }

        const questionIds = fetchedTestDetails.questionIds;
                if (!questionIds || questionIds.length === 0) {
          throw new Error("This test has no questions assigned.");
        }

        // 2. Fetch Questions based on IDs
// Appwrite Query Limitation: Query.equal('$id', array) works reliably for up to 100 IDs.
        // TODO: Implement batching or alternative if > 100 questions needed.
        if (questionIds.length > 100) {
            console.warn("Test has more than 100 questions. Fetching only the first 100. Implement batching for full support.");
            // Optionally throw an error or fetch only the first 100 for now
            // throw new Error("Tests with more than 100 questions are not fully supported yet.");
        }

// Appwrite Query Limitation: Query.equal('$id', array) works reliably for up to 100 IDs.
        // TODO: Implement batching or alternative if > 100 questions needed.
        if (questionIds.length > 100) {
            console.warn("Test has more than 100 questions. Fetching only the first 100. Implement batching for full support.");
            // Optionally throw an error or fetch only the first 100 for now
            // throw new Error("Tests with more than 100 questions are not fully supported yet.");
        }

        const fetchedQuestions = await databases.listDocuments<Question>(
          DB_ID,
          QUESTIONS_COLLECTION_ID,
          [
            Query.equal('$id', questionIds),
            Query.limit(100)
          ]
        );
        console.log('Fetched questions:', fetchedQuestions.documents);

        // Ensure questions are in the same order as questionIds
        const orderedQuestions = questionIds
          .map(id => fetchedQuestions.documents.find(q => q.$id === id))
          .filter((q): q is Question => q !== undefined);
        
        console.log('Ordered questions:', orderedQuestions);

        // 3. Update the Zustand store with fetched data
        startExam(fetchedTestDetails, orderedQuestions);

      } catch (err: any) {
        console.error("Failed to fetch exam data:", err);
        setError(err.message || "Failed to load the exam.")// Optionally redirect user away if exam fails to load
        // router.push('/dashboard?error=exam_load_failed');
;
// Optionally redirect user away if exam fails to load
        // router.push('/dashboard?error=exam_load_failed');
      }
    };

    fetchExamData();

// Cleanup function to reset state when leaving the exam page
    return () => {
      resetExamState();
    };

  }, [testId, startLoading, startExam, setError, resetExamState, router]); // Add dependencies

  // --- Render Logic ---
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading Exam...</div>;
  }

  if (error) {
    return (
        <div className="max-w-2xl mx-auto text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="text-xl font-bold mb-2">Error Loading Exam</h2>
            <p>{error}</p>
            <button onClick={() => router.push('/dashboard')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Back to Dashboard
            </button>
        </div>
      );
  }

  if (questions.length === 0) {
    // This case might be caught by error handling, but good to have a fallback
    return <div>No questions loaded for this exam.</div>;
  }

  // Get the current question based on the index from the store
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen overflow-hidden p-4 gap-4">
       {/* Left Panel (Main Content) */}
       <div className="flex-grow flex flex-col overflow-y-auto">
          {/* Header Section (Timer, Question X of Y) - Placeholder */}
          <div className="flex justify-between items-center mb-4 p-4 bg-white rounded shadow sticky top-0 z-10">
             <h2 className="text-xl font-semibold">
                {testDetails?.name || 'Exam'} - Question {currentQuestionIndex + 1} of {questions.length}
             </h2>
             <div>{/* Timer component placeholder */}</div>
          </div>

          {/* Question Display Area */}
          <div className="flex-grow p-4 bg-white rounded shadow mb-4">
             {currentQuestion ? (
                <QuestionDisplay question={currentQuestion} />
             ) : (
                 <div>Question data not available.</div>
             )}
          </div>

           {/* Navigation Buttons (Next, Prev, Mark) - Placeholder */}
          <div className="flex justify-between items-center p-4 bg-white rounded shadow sticky bottom-0 z-10">
             <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Previous</button>
             <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">Mark for Review</button>
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto">Submit</button>
          </div>
       </div>

       {/* Right Panel (Question Navigator) - Placeholder */}
       <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0 bg-white rounded shadow p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
          {/* Navigator component placeholder */}
          <div className="grid grid-cols-5 gap-2">
             {questions.map((q, index) => (
                <button key={q.$id} className="border p-2 rounded text-center">{index + 1}</button>
             ))}
          </div>
       </div>
    </div>
  );
}