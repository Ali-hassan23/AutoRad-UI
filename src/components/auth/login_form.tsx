"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";

type Errors = {
  email?: string;
  password?: string;
  general?: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Login failed");
      }

      // Redirect to the originally requested page or dashboard
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl}/auth/login/google`;
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, general: undefined }));
  };

  return (
    <div>
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-semibold text-foreground">Log in</h2>
        <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {errors.general && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            {errors.general}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={submitting}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            disabled={submitting}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 h-11 cursor-pointer w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={submitting}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition hover:bg-muted/50 disabled:opacity-50"
      >
        <IconBrandGoogle className="h-4 w-4" />
        Continue with Google
      </button>
    </div>
  );
}
