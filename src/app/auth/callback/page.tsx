"use client";

import { useEffect, useState } from "react";

/**
 * OAuth Callback Handler
 * Place this component at /app/auth/callback/page.tsx
 *
 * This page confirms the cookie-backed session is ready before redirecting.
 */
export default function OAuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch("/api/users/me", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Invalid response from server");
        }

        const userData = await response.json();
        
        setStatus("success");
        setMessage("Login successful! Redirecting...");

        // Determine redirect destination based on user role
        const redirectUrl = userData.role === "admin" ? "/admin" : "/dashboard";

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1500);
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setMessage("Authentication failed. Redirecting to login...");

        setTimeout(() => {
          window.location.href = "/auth";
        }, 3000);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <h2 className="text-xl font-semibold text-gray-900">
                Completing Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Success!</h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Authentication Failed
              </h2>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
