// This can be a Server Component initially if just displaying static text,
// or make it 'use client' if you need hooks immediately (e.g., to display user name from useAuth)

// Example as a basic Server Component:
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your practice platform dashboard!</p>
      <p>Topic cards and other features will appear here.</p>
      {/* You could make this 'use client' and use useAuth() to display user.name */}
    </div>
  );
}

/*
// Example as a Client Component using useAuth:
'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth(); // Get user from context

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && <p className="mb-4">Welcome back, {user.name || user.email}!</p>}
      <p>Topic cards and other features will appear here.</p>
    </div>
  );
}
*/