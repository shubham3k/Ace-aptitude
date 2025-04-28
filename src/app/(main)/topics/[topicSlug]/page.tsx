import { databases, DB_ID, TOPICS_COLLECTION_ID, TESTS_COLLECTION_ID } from '@/lib/appwrite';
import { Topic, Test } from '@/types'; // Import both Topic and Test types
import { Query } from 'appwrite';
import { notFound } from 'next/navigation';
import { TestListItem } from '@/components/features/topics/TestListItem'; // We'll create this next

interface TopicDetailPageProps {
  params: {
    topicSlug: string;
  };
}

// Function to get topic (from Day 3 - unchanged)
async function getTopicBySlug(slug: string): Promise<Topic | null> {
  // ... (keep existing implementation from Day 3)
  console.log(`Fetching topic with slug: ${slug}`);
  try {
    const response = await databases.listDocuments<Topic>(
      DB_ID,
      TOPICS_COLLECTION_ID,
      [Query.equal('slug', slug), Query.limit(1)]
    );
    if (response.documents.length > 0) {
      console.log(`Found topic: ${response.documents[0].name} ($id: ${response.documents[0].$id})`);
      return response.documents[0];
    } else {
      console.log(`Topic with slug "${slug}" not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch topic with slug "${slug}":`, error);
    return null;
  }
}

// --- NEW: Function to fetch tests for a given topic ID ---
async function getTestsForTopic(topicId: string): Promise<Test[]> {
  console.log(`Fetching tests for topicId: ${topicId}`);
  try {
    const response = await databases.listDocuments<Test>(
      DB_ID,
      TESTS_COLLECTION_ID,
      [
        Query.equal('topicId', topicId), // Filter by the specific topic ID
        Query.equal('isEnabled', true),  // Only fetch tests that are enabled
        Query.orderAsc('name')          // Order tests alphabetically by name
        // You could add Query.limit() and implement pagination later if needed
      ]
    );
    console.log(`Found ${response.documents.length} tests for topic ${topicId}.`);
    return response.documents;
  } catch (error) {
    console.error(`Failed to fetch tests for topic ${topicId}:`, error);
    return []; // Return empty array on error
  }
}

// Updated Topic Detail Page Component
export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { topicSlug } = await params;
  const topic = await getTopicBySlug(topicSlug);

  if (!topic) {
    notFound(); // Topic not found, show 404
  }

  // --- NEW: Fetch tests using the found topic's ID ---
  const tests = await getTestsForTopic(topic.$id); // Use the actual $id of the topic

  return (
    <div>
      {/* Topic Header */}
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-gray-800">{topic.name}</h1>
         {topic.description && <p className="mt-2 text-lg text-gray-600">{topic.description}</p>}
      </div>

      {/* Test List Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Tests</h2>
      {tests.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No tests available for this topic yet. Please check back later!
        </div>
      ) : (
        <div className="space-y-4"> {/* Creates vertical space between list items */}
          {tests.map((test) => (
            // Render the TestListItem component for each test
            <TestListItem key={test.$id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}