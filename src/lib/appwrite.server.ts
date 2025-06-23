import { Client, Databases, ID, Permission, Role } from 'appwrite';

// Validate environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT; // Use the public one for endpoint URL
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; // Use the public one for project ID
const apiKey = process.env.APPWRITE_API_KEY; // Use the secret API key

if (!endpoint || !projectId || !apiKey) {
  console.error("Missing server-side Appwrite environment variables. Endpoint, Project ID, or API Key is missing.");
  // In a real app, you might throw an error or handle this more gracefully
  // For seeding, we'll check again in the API route handler.
}

// Initialize Appwrite Client for server-side operations (using API Key)
const serverClient = new Client()
    .setEndpoint(endpoint!) // Your Appwrite Endpoint
    .setProject(projectId!) // Your project ID
    //.setKey(apiKey!); // Set the API key

// Initialize Appwrite Services using the server client
const serverDatabases = new Databases(serverClient);
// Add other server-side services if needed (e.g., serverAccount, serverStorage)

// Export necessary constants and services
export {
    serverClient,
    serverDatabases,
    ID, // Export ID generator
    Permission, // Export Permission helpers
    Role, // Export Role helpers
};

// Re-export DB and Collection IDs from the shared lib/appwrite.ts for convenience
export {
    DB_ID,
    PROFILES_COLLECTION_ID,
    TOPICS_COLLECTION_ID,
    TESTS_COLLECTION_ID,
    QUESTIONS_COLLECTION_ID,
    ATTEMPTS_COLLECTION_ID
} from './appwrite';