import Link from 'next/link';
import { Test } from '@/types';
// Example using react-icons (npm install react-icons)
import { FiClock, FiCheckSquare, FiBarChart2, FiChevronRight } from 'react-icons/fi';

interface TestListItemProps {
  test: Test;
}

// Helper function to format difficulty (optional)
const formatDifficulty = (difficulty?: string) => {
  if (!difficulty) return 'Not specified';
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

export function TestListItem({ test }: TestListItemProps) {
  const numberOfQuestions = test.questionIds?.length || 0; // Calculate number of questions

  return (
    <Link
      href={`/tests/${test.$id}`} // Link to the specific test page (placeholder for now)
      className="block bg-white p-5 rounded-lg shadow border border-transparent hover:shadow-md hover:border-blue-300 transition duration-200 group"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        {/* Left Side: Test Name and Description */}
        <div className="mb-3 sm:mb-0 flex-grow mr-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 mb-1">
            {test.name}
          </h3>
          {test.description && (
             <p className="text-sm text-gray-500 line-clamp-2">{test.description}</p>
          )}
        </div>

        {/* Right Side: Metadata & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
          {/* Metadata Icons */}
          <div className="flex items-center" title="Number of Questions">
            <FiCheckSquare className="w-4 h-4 mr-1 text-gray-500" />
            <span>{numberOfQuestions} Qs</span>
          </div>
          <div className="flex items-center" title="Estimated Duration">
            <FiClock className="w-4 h-4 mr-1 text-gray-500" />
            <span>{test.durationMinutes} min</span>
          </div>
          {test.difficulty && (
            <div className="flex items-center" title="Difficulty">
               <FiBarChart2 className="w-4 h-4 mr-1 text-gray-500" />
               <span>{formatDifficulty(test.difficulty)}</span>
            </div>
          )}

          {/* Action Indicator */}
          <div className="hidden sm:flex items-center text-blue-600 group-hover:text-blue-800 ml-auto pl-4">
             <span>Start</span>
             <FiChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
       {/* Action Indicator for Mobile (always visible) */}
       <div className="sm:hidden flex items-center justify-end text-sm text-blue-600 group-hover:text-blue-800 mt-3">
         <span>Start Test</span>
         <FiChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
       </div>
    </Link>
  );
}