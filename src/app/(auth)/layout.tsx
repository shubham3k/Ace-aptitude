// src/app/(auth)/layout.tsx
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 dark:bg-gray-900">
      {/* This div centers the content vertically and horizontally */}
      {children}
    </div>
  );
}