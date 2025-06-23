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





// --- NEW: Question interface ---
export interface Question extends Models.Document {
  text: string;           // The question text (can include markdown/HTML)
  options: string[];      // Array of possible answer strings
  correctOptionIndex: number; // 0-based index of the correct answer in options
  explanation?: string;   // Optional explanation
  topicId: string;        // Associated topic ID (for organization/filtering)
  difficulty?: 'easy' | 'medium' | 'hard' | string;
  // Add any other attributes you defined for the 'questions' collection
}

// Add Attempt types later...