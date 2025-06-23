import { databases, DB_ID, TOPICS_COLLECTION_ID } from '@/lib/appwrite';
import { TopicCard } from '@/components/features/dashboard/topicCard'; // We'll create this next
import { Topic } from '@/types'; // Import the Topic type
import { Query } from 'appwrite'; // Import Query for sorting/filtering

// Server-side function to fetch topics
async function getTopics(): Promise<Topic[]> {
    console.log(`Fetching topics from DB: ${DB_ID}, Collection: ${TOPICS_COLLECTION_ID}`);
    try {
        const response = await databases.listDocuments<Topic>(
            DB_ID,
            TOPICS_COLLECTION_ID,
            [
                // Optional: Add queries like sorting if you have an 'order' attribute
                // Query.orderAsc('order'),
                Query.orderAsc('name') // Sort alphabetically by name as a default
            ]
        );
        console.log(`Fetched ${response.documents.length} topics.`);
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch topics:", error);
        // In a real app, you might want more robust error handling here
        // For now, return empty array on error
        return [];
    }
}

// The Dashboard Page Component (Async Server Component)
export default async function DashboardPage() {
    // Fetch topics directly within the Server Component
    const topics = await getTopics();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Explore Topics</h1>

            {topics.length === 0 ? (
                <p className="text-gray-600">No topics available at the moment. Check back later!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {topics.map((topic) => (
                        // Render the TopicCard component for each topic
                        <TopicCard key={topic.$id} topic={topic} />
                    ))}
                </div>
            )}
        </div>
    );
}