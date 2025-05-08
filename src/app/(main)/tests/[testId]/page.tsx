'use client'; // <<<<----- ADD THIS LINE -----

import { databases, DB_ID, TESTS_COLLECTION_ID } from '@/lib/appwrite';
import { Test } from '@/types';
import { notFound, useRouter } from 'next/navigation'; // <<-- Import useRouter
import Link from 'next/link';
import { useEffect, useState } from 'react'; // <<-- Import useEffect, useState for client-side fetch
import { useExamStore } from '@/store/examStore'; // <<-- Import Zustand store hook

interface TestStartPageProps {
  params: {
    testId: string;
  };
}

// NOTE: Fetching logic now moves to client-side useEffect
// because page is 'use client' for the button's onClick

export default function TestStartPage({ params }: TestStartPageProps) {
  const { testId } = params;
  const router = useRouter(); 
  const [test, setTest] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resetExamState = useExamStore((state) => state.resetExamState); // Get reset action

  useEffect(() => {
    // Reset any previous exam state when entering this page
    resetExamState();

    const fetchTest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const testDocument = await databases.getDocument<Test>(
              DB_ID,
              TESTS_COLLECTION_ID,
              testId
            );
            if (!testDocument.isEnabled) {
               setError("This test is currently cannot be accesed.");
               setTest(null); // Ensure test is null if disabled
            } else {
               setTest(testDocument);
            }
        } catch (err: any) {
            if (err.code === 404) {
                setError("Test not found.");
                // Optionally call notFound() here, but requires careful handling in client components
                // For simplicity, we'll show an error message.
            } else {
                console.error(`Failed to fetch test:`, err);
                setError("Failed to load test data.");
            }
             setTest(null); // Ensure test is null on error
        } finally {
            setIsLoading(false);
        }
    };
    fetchTest();
  }, [testId, resetExamState]); // Depend on testId and the reset action

  const handleStartTest = () => {
    if (test) {
      // Optional: Could pre-load questions here or let the exam page handle it
      console.log(`Starting test: ${test.name} (${test.$id})`);
      router.push(`/exam/${test.$id}`); // Navigate to the exam page
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading test details...</div>;
  }

  if (error) {
     // Display error prominently - consider a dedicated error component
      return (
        <div className="max-w-2xl mx-auto text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            {/* Add a button to go back or to dashboard */}
        </div>
      );
  }

  if (!test) {
     // Should ideally be caught by error state, but as a fallback:
     return <div className="text-center p-10">Test data could not be loaded.</div>;
  }


  // --- JSX from Day 4, but now uses client-side 'test' state ---
  const numberOfQuestions = test.questionIds?.length || 0;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{test.name}</h1>
        {/* ... (rest of the test details display: description, grid for Qs/Duration) ... */}
         <div className="grid grid-cols-2 gap-4 mb-8 text-center">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm font-medium text-blue-700">Questions</p>
            <p className="text-2xl font-semibold text-blue-900">{numberOfQuestions}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm font-medium text-green-700">Duration</p>
            <p className="text-2xl font-semibold text-green-900">{test.durationMinutes} min</p>
          </div>
        </div>

        <div className="text-center">
          <button
             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
             onClick={handleStartTest} // <<-- ADD onClick HANDLER
             disabled={!test || numberOfQuestions === 0} // <<-- Disable if no test or no questions
             title={numberOfQuestions === 0 ? "This test has no questions configured." : "Start the test"}
           >
             Start Test
          </button>
          {numberOfQuestions === 0 && <p className="text-sm text-red-500 mt-2">Cannot start: Test has no questions.</p>}
        </div>
      </div>
    </div>
  );
}