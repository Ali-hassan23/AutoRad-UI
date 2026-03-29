"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandGoogle } from "@tabler/icons-react";

type Errors = {
  email?: string;
  password?: string;
  general?: string;
};

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLE SUBMIT ---------------- */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      // Create form-data (OAuth2PasswordRequestForm format)
      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      // Call Next.js API route (which proxies to FastAPI)
      // Cookies will be set automatically by the browser
      const res = await fetch(`api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include", // Important: include cookies
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Login failed");
      }

      // Success! Cookies are set, just redirect
      router.push("/dashboard");
      router.refresh(); // Refresh server components to get new auth state
    } catch (err) {
      console.error("Login error:", err);
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */

  const handleGoogleLogin = () => {
    // Redirect directly to backend OAuth endpoint
    // Backend will set cookies and redirect back to frontend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl}/auth/login/google`;
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, general: undefined }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">Welcome Back</h2>
        <p className="text-sm text-blue-500">Login to AutoRad</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {errors.general && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={submitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={submitting}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <Separator className="my-4" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconBrandGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}