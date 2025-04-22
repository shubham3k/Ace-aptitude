'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ID } from "appwrite";

import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

export default function RegisterPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof formState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, [field]: e.target.value });
  };

  const formFields: FormField[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "User name",
      value: formState.name,
      setValue: (value) => updateField("name")({ target: { value } } as any)
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "gmail address",
      value: formState.email,
      setValue: (value) => updateField("email")({ target: { value } } as any)
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: formState.password,
      setValue: (value) => updateField("password")({ target: { value } } as any)
    }
  ];

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);
    
    const { name, email, password } = formState;

    try {
      const response = await account.create(ID.unique(), email, password, name);
      console.log("✅ Account created:", response);
      // You could add a redirection here
      // window.location.href = "/login"; 
    } catch (error: any) {
      setError(error.message || "Registration failed");
      console.error("❌ Registration error:", error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="grid gap-4">
          {formFields.map(field => (
            <div key={field.id} className="grid gap-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={updateField(field.id as keyof typeof formState)}
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create an account"}
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}