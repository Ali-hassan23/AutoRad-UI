"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./login_form";
import { SignupForm } from "./register_form";

export default function AuthSwitcher() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      {/* Content Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        {mode === "login" ? (
          <LoginForm/>
        ) : (
          <SignupForm />
        )}

        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Button>
      </div>
    </div>
  );
}