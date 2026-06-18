"use client";

import { useState } from "react";
import AdminNavLink from "@/components/Admin/AdminNavLink";
import SignOutButton from "@/components/auth/SignOutButton";

type Props = {
  role: string;
};

export default function MobileNav({ role }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="md:hidden flex flex-col justify-center items-center h-9 w-9 gap-1.5 rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
      >
        <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Dropdown drawer */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-slate-100 bg-white/95 backdrop-blur px-6 pb-5 pt-4 shadow-lg z-20">
          <nav className="flex flex-col gap-1">
            <a href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary bg-primary/10">Dashboard</a>
            <a href="/preprocess" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">Generate Reports</a>
            <a href="/history" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">History</a>
            <AdminNavLink role={role} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50 transition" />
            <a href="/settings" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">Settings</a>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <SignOutButton className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition">
                Sign out
              </SignOutButton>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}