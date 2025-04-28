import { Models } from 'appwrite';

// Existing Topic interface
export interface Topic extends Models.Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
}

// --- NEW: Test interface ---
export interface Test extends Models.Document {
  name: string;
  topicId: string;       // ID referencing the parent Topic document
  questionIds: string[]; // Array of Question document IDs
  durationMinutes: number;
  difficulty?: 'easy' | 'medium' | 'hard' | string; // Use specific types or string
  description?: string;  // Optional test description
  isEnabled: boolean;
  // Add any other attributes you defined for the 'tests' collection
}

// Add Question, Attempt types later...