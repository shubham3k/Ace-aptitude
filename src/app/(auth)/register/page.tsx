'use client'; // This page component needs client-side interactivity for the form

import { AuthForm } from '@/components/features/auth/AuthForm'; // We will create this next

export default function SignupPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
      <AuthForm formType="signup" />
      {/* Add link for 'Already have an account? Login' later */}
    </div>
  );
}