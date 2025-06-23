'use client'; // This page component needs client-side interactivity for the form

import { AuthForm } from '@/components/features/auth/AuthForm'; // We will create this next

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <AuthForm formType="login" />
      {/* Add links for 'Forgot Password?' or 'Sign Up' later */}
    </div>
  );
}