//signoutbutton
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { logout } from "@/lib/auth";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function SignOutButton({ className = "", children = "Sign out" }: Props) {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (pending) return;
    setPending(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Navigate after logout completes, ensuring cookies are cleared first
      window.location.href = "/auth";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={className}
    >
      {pending ? "Signing out..." : children}
    </button>
  );
}
