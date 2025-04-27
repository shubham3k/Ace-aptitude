'use client'; // This component uses client-side hooks and interacts with APIs

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use App Router's navigation
import { account } from '@/lib/appwrite'; // Import Appwrite account service
import { AppwriteException, ID } from 'appwrite'; // Import specific Appwrite types

// Define props type
interface AuthFormProps {
  formType: 'login' | 'signup';
}

export function AuthForm({ formType }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState(''); // Only used for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formType === 'signup') {
        // --- Sign Up Logic ---
        // Use ID.unique() to let Appwrite generate a unique user ID
        const user = await account.create(ID.unique(), email, password, name);
        
        // After successful account creation, create a session
        // Make sure there are no existing sessions first
        try {
          await account.createEmailPasswordSession(email, password);
          alert('Signup successful! You are now logged in.');
          router.push('/dashboard'); // Redirect to dashboard after signup/login
        } catch (sessionError) {
          // If session creation fails, show a message but still consider signup successful
          console.error('Session creation failed:', sessionError);
          alert('Signup successful! Please log in with your new account.');
          router.push('/login');
        }
      } else {
        // --- Login Logic ---
        // For login, first check if there's an existing session and delete it
        try {
          // First try to get the current session
          const session = await account.getSession('current');
          if (session) {
            // If a session exists, delete it first
            await account.deleteSession(session.$id);
          }
        } catch (e) {
          // Ignore errors here - no session exists
        }
        
        // Now create a new session
        await account.createEmailPasswordSession(email, password);
        alert('Login successful!');
        router.push('/dashboard');
      }
    } catch (e) {
      const error = e as AppwriteException;
      console.error(`${formType} failed:`, error);
      setError(error.message || `An error occurred during ${formType}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formType === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={formType === 'login' ? 'current-password' : 'new-password'}
          required
          minLength={8} // Appwrite requires min 8 chars by default
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formType === 'signup' && <p className="mt-1 text-xs text-gray-500">Minimum 8 characters.</p>}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : (formType === 'login' ? 'Login' : 'Sign Up')}
        </button>
      </div>
    </form>
  );
}