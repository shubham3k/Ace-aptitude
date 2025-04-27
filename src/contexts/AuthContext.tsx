'use client'; // Provider will wrap client components and use hooks

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { account } from '@/lib/appwrite'; // Import Appwrite account service
import { Models, AppwriteException } from 'appwrite'; // Import relevant types

// Define the shape of the context data
interface AuthContextType {
  user: Models.User<Models.Preferences> | null; // Appwrite's user model or null
  isLoading: boolean; // To handle initial auth check loading state
  checkAuthStatus: () => Promise<void>; // Function to re-check status
  logout: () => Promise<void>; // Function to log out
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading initially

    // Function to check authentication status
    const checkAuthStatus = useCallback(async () => {
        setIsLoading(true); // Set loading true when checking
        try {
            const currentUser = await account.get(); // Attempt to get current user
            setUser(currentUser);
        } catch (error) {
            // If account.get() fails, it means user is not logged in
            if (error instanceof AppwriteException && error.code !== 401) {
              // Log errors other than standard "not authenticated"
              console.error("Auth Check Error:", error);
            }
            setUser(null); // Ensure user is set to null if not logged in
        } finally {
            setIsLoading(false); // Set loading false once check is complete
        }
    }, []); // useCallback to memoize the function

    // Function to handle logout
    const logout = useCallback(async () => {
        try {
            await account.deleteSession('current'); // Delete the current session
            setUser(null); // Clear user state
        } catch (error) {
            console.error("Logout Failed:", error);
            // Optionally handle logout errors (e.g., show a message)
        }
    }, []); // useCallback

    // useEffect to run the auth check when the provider mounts
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]); // Run effect when checkAuthStatus function reference changes (stable due to useCallback)

    // Provide the context value to children
    const value = { user, isLoading, checkAuthStatus, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook for easy context consumption
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // Ensure the hook is used within an AuthProvider
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}