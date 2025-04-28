import Link from 'next/link'; // Import Next.js Link for client-side navigation
import { Topic } from '@/types'; // Import the Topic type definition
import { FiChevronRight } from 'react-icons/fi'; // Example Icon (install react-icons: npm install react-icons)

interface TopicCardProps {
  topic: Topic; // Define the expected prop type
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${topic.slug}`} // Link to the dynamic topic page using the slug
      className="block group bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 hover:border-blue-500"
    >
      <div className="p-5">
        {/* Optional: Add an icon here based on topic.icon */}
        {/* <div className="text-blue-600 mb-2"><SomeIconComponent /></div> */}

        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 mb-2 truncate">
          {topic.name}
        </h3>

        {topic.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2"> {/* Limit description lines */}
            {topic.description}
          </p>
        )}

        <div className="flex justify-end items-center text-sm font-medium text-blue-600 group-hover:text-blue-800">
          Practice
          <FiChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}