import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      {/* Centered card container for the auth forms */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {children} {/* Login/Signup page content will render here */}
      </div>
    </div>
  );
}