import { databases, DB_ID, TESTS_COLLECTION_ID } from '@/lib/appwrite';
import { Test } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link'; // For potential back button

interface TestStartPageProps {
  params: {
    testId: string; // The dynamic segment from the URL ([testId])
  };
}

// Server-side function to fetch a single test by its ID
async function getTestById(testId: string): Promise<Test | null> {
  console.log(`Fetching test with ID: ${testId}`);
  try {
    const testDocument = await databases.getDocument<Test>(
      DB_ID,
      TESTS_COLLECTION_ID,
      testId // Use the ID directly with getDocument
    );
    console.log(`Found test: ${testDocument.name}`);
    return testDocument;
  } catch (error: any) {
    // Appwrite throws specific errors, check for 404
    if (error.code === 404) {
      console.log(`Test with ID "${testId}" not found.`);
    } else {
      console.error(`Failed to fetch test with ID "${testId}":`, error);
    }
    return null; // Return null if not found or on other errors
  }
}

// The Test Start Page Component (Async Server Component)
export default async function TestStartPage({ params }: TestStartPageProps) {
  const { testId } = params;
  const test = await getTestById(testId);

  if (!test) {
    notFound(); // Test ID is invalid or test doesn't exist
  }

  // Ensure isEnabled is checked server-side as well (belt-and-suspenders)
  if (!test.isEnabled) {
      console.log(`Attempted to access disabled test: ${testId}`);
      // Decide how to handle - show "not available" or 404? Let's use 404 for simplicity.
      notFound();
  }

  const numberOfQuestions = test.questionIds?.length || 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Optional: Breadcrumb or back link */}
      {/* <Link href={`/topics/???`} className="text-blue-600 hover:underline mb-4 inline-block">← Back to Topic</Link> */}
      {/* Note: Getting back to the specific topic page requires knowing the topic slug, which isn't directly on the test object. */}
      {/* You might need to fetch the topic data as well if you want an accurate back link. */}

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{test.name}</h1>
        {test.description && (
          <p className="text-base text-gray-600 mb-6">{test.description}</p>
        )}

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
          {/* This button will trigger the exam start logic on Day 5 */}
          <button
             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
             // onClick handler will be added later
           >
             Start Test
          </button>
        </div>
      </div>
    </div>
  );
}