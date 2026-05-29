"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";

type Errors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  general?: string;
};

type FieldError = {
  msg?: string;
};

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};
    if (!form.firstname.trim()) newErrors.firstname = "Required";
    if (!form.lastname.trim()) newErrors.lastname = "Required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }
    if (!form.confirmpassword) {
      newErrors.confirmpassword = "Required";
    } else if (form.password !== form.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseError = async (res: Response) => {
    let message = "Something went wrong";
    try {
      const data = await res.json();
      if (typeof data.detail === "string") message = data.detail;
      else if (Array.isArray(data.detail))
        message = data.detail
          .map((e: FieldError) => e.msg)
          .filter(Boolean)
          .join(", ");
    } catch {
      message = res.statusText || message;
    }
    return message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const registerRes = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          full_name: `${form.firstname} ${form.lastname}`.trim(),
          role: "user",
        }),
        credentials: "include",
      });

      if (!registerRes.ok) {
        const message = await parseError(registerRes);
        if (message.toLowerCase().includes("email")) {
          setErrors({ email: message });
        } else {
          setErrors({ general: message });
        }
        setSubmitting(false);
        return;
      }

      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      const loginRes = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        credentials: "include",
      });

      if (!loginRes.ok) {
        router.push("/auth?registered=true");
        return;
      }

      // Redirect to the originally requested page or dashboard
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to connect to server";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    window.location.href = `${backendUrl}/auth/login/google`;
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, general: undefined }));
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50";

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-muted">Create account</h2>
        <p className="text-xs text-muted mt-0.5">
          Join AutoRad and get started today
        </p>
      </div>

      <form className="space-y-2.5" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {errors.general}
          </div>
        )}

        {/* First + Last name side by side */}
        <div className="grid grid-cols-2 gap-2.5 text-white">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              First name
            </label>
            <input
              value={form.firstname}
              onChange={(e) => updateField("firstname", e.target.value)}
              disabled={submitting}
              placeholder="Jane"
              className={inputCls}
            />
            {errors.firstname && (
              <p className="mt-0.5 text-[10px] text-destructive">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              Last name
            </label>
            <input
              value={form.lastname}
              onChange={(e) => updateField("lastname", e.target.value)}
              disabled={submitting}
              placeholder="Smith"
              className={inputCls}
            />
            {errors.lastname && (
              <p className="mt-0.5 text-[10px] text-destructive">{errors.lastname}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={submitting}
            placeholder="you@example.com"
            className={inputCls}
          />
          {errors.email && (
            <p className="mt-0.5 text-[10px] text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password + Confirm side by side */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={submitting}
              placeholder="••••••••"
              className={inputCls}
            />
            {errors.password && (
              <p className="mt-0.5 text-[10px] text-destructive">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              Confirm
            </label>
            <input
              type="password"
              value={form.confirmpassword}
              onChange={(e) => updateField("confirmpassword", e.target.value)}
              disabled={submitting}
              placeholder="••••••••"
              className={inputCls}
            />
            {errors.confirmpassword && (
              <p className="mt-0.5 text-[10px] text-destructive">{errors.confirmpassword}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 h-10 cursor-pointer w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <div className="my-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={submitting}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 text-sm font-medium text-foreground transition hover:bg-muted/50 disabled:opacity-50"
      >
        <IconBrandGoogle className="h-4 w-4" />
        Continue with Google
      </button>
    </div>
  );
}
