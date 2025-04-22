'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof formState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, [field]: e.target.value });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);
    
    const { email, password } = formState;

    try {
      // Attempt to login with Appwrite
      await account.createEmailPasswordSession(email, password);
      console.log('✅ Login successful');
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
      console.error('❌ Login error:', error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={formState.email}
              onChange={updateField('email')}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={formState.password}
              onChange={updateField('password')}
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            <Link href="/forgot-password" className="text-gray-500 hover:text-gray-700">
              Forgot password?
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}