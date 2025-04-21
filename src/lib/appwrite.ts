
import { Client, Account, Databases, Functions, Storage } from 'appwrite';


const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

if (!projectId || !endpoint) {
  throw new Error("Appwrite Project ID or Endpoint URL is not defined in environment variables.");
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);
const storage = new Storage(client);

export { client, account, databases, functions, storage };