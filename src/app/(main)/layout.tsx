'use client'; // Required for hooks (useAuth, useRouter, useEffect)

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // Import Provider and hook
// import Header from '@/components/common/Header'; // Placeholder for Header
// import Sidebar from '@/components/common/Sidebar'; // Placeholder for Sidebar

// Inner component that consumes the context and handles redirection
function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth(); // Use the hook to get auth state
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial loading is finished
    if (!isLoading) {
      // If not loading and no user, redirect to login
      if (!user) {
        router.replace('/login'); // Use replace to avoid adding auth check page to history
      }
      // If user exists, stay on the page (children will be rendered)
    }
  }, [user, isLoading, router]); // Re-run effect if user, loading state, or router changes

  // Optional: Show a loading indicator while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading authentication...</div> {/* Replace with a proper spinner/skeleton */}
      </div>
    );
  }


  // If user is loaded and exists, render the main app layout
  if (user) {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* <Sidebar /> */} {/* Placeholder */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <Header user={user} onLogout={logout}/> */} {/* Placeholder, pass user/logout */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
             {/* Temp Header showing user and logout */}
             <header className="bg-white shadow p-4 mb-4 flex justify-between items-center">
                <span>Welcome, {user.name || user.email}</span>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                    Logout
                </button>
             </header>
             {/* --- End Temp Header --- */}
            {children} {/* The actual page content (e.g., dashboard, topics) */}
          </main>
        </div>
      </div>
    );
  }

  // If not loading and no user, this part might briefly render before redirect
  // You could return null or a minimal layout, but the redirect should happen quickly
  return null;
}

// Outer component that wraps the AuthenticatedLayout with the AuthProvider
export default function ProtectedRoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </AuthProvider>
  );
}