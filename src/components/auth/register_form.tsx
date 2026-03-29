"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";

type Errors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  general?: string;
};

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!form.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

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

    if (!form.confirmpassword) {
      newErrors.confirmpassword = "Please confirm your password";
    } else if (form.password !== form.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      // Register user
      const registerRes = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          full_name: `${form.firstname} ${form.lastname}`.trim(),
          role: "user",
        }),
        credentials: "include",
      });

      if (!registerRes.ok) {
        const errorData = await registerRes.json().catch(() => ({}));
        throw new Error(errorData.detail || "Registration failed");
      }

      // Auto-login after successful registration
      const loginFormData = new URLSearchParams();
      loginFormData.append("username", form.email);
      loginFormData.append("password", form.password);

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: loginFormData.toString(),
        credentials: "include",
      });

      if (loginRes.ok) {
        // Success! Cookies are set, redirect to dashboard
        router.push("/dashboard");
        router.refresh();
      } else {
        // Registration successful but auto-login failed
        router.push("/login?registered=true");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const message = err instanceof Error ? err.message : "Registration failed";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl}/auth/login/google`;
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, general: undefined }));
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-blue-600">
        Create Your Account
      </h2>

      <p className="mt-2 text-center text-sm text-blue-500">
        Welcome to AutoRad
      </p>

      <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {errors.general}
          </div>
        )}

        <LabelInputContainer>
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            value={form.firstname}
            onChange={(e) => updateField("firstname", e.target.value)}
            className="focus-visible:ring-blue-100"
            disabled={submitting}
          />
          {errors.firstname && <ErrorText>{errors.firstname}</ErrorText>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            value={form.lastname}
            onChange={(e) => updateField("lastname", e.target.value)}
            className="focus-visible:ring-blue-100"
            disabled={submitting}
          />
          {errors.lastname && <ErrorText>{errors.lastname}</ErrorText>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="focus-visible:ring-blue-100"
            disabled={submitting}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="focus-visible:ring-blue-100"
            disabled={submitting}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            id="confirmpassword"
            type="password"
            value={form.confirmpassword}
            onChange={(e) => updateField("confirmpassword", e.target.value)}
            className="focus-visible:ring-blue-100"
            disabled={submitting}
          />
          {errors.confirmpassword && (
            <ErrorText>{errors.confirmpassword}</ErrorText>
          )}
        </LabelInputContainer>

        <button
          type="submit"
          disabled={submitting}
          className="h-11 w-full cursor-pointer rounded-md bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="my-3 h-px w-full bg-blue-100" />

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={submitting}
          className="flex h-11 cursor-pointer w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconBrandGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

/* ---------- Small Components ---------- */

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-red-500">{children}</p>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
);