"use client";

import { useState, useEffect, useRef } from "react";
import { LoginForm } from "./login_form";
import { SignupForm } from "./register_form";
import Image from "next/image";

type Mode = "login" | "signup";

export default function AuthSwitcher() {
  const [mode, setMode] = useState<Mode>("login");
  // "displayed" lags behind mode — it stays as the old form during the exit animation
  const [displayed, setDisplayed] = useState<Mode>("login");
  const [animating, setAnimating] = useState(false);
  // "out" drives the exit slide/fade, "in" drives the enter slide/fade
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  function switchMode(next: Mode) {
    if (next === mode || animating) return;
    setAnimating(true);
    setPhase("out");

    // After exit animation finishes, swap content and play enter
    setTimeout(() => {
      setMode(next);
      setDisplayed(next);
      setPhase("in");
    }, 280);

    // After enter animation finishes, clean up
    setTimeout(() => {
      setPhase("idle");
      setAnimating(false);
    }, 560);
  }

  // Slide direction: going to signup → slide left; going to login → slide right
  const toSignup = mode === "signup";

  const formExitClass =
    phase === "out"
      ? toSignup
        ? "opacity-0 -translate-x-6"
        : "opacity-0 translate-x-6"
      : "";

  const formEnterClass =
    phase === "in"
      ? "opacity-100 translate-x-0"
      : phase === "idle"
      ? "opacity-100 translate-x-0"
      : toSignup
      ? "opacity-0 translate-x-6"
      : "opacity-0 -translate-x-6";

  return (
    <div className="h-screen w-screen overflow-hidden flex">

      {/* ── LEFT PANEL ── */}
      <div
        className={`
          hidden md:flex flex-col justify-between w-1/2 p-10
          transition-all duration-500 ease-in-out
          ${mode === "login"
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
            : "bg-white border-r border-slate-100"}
        `}
      >
        {/* Logo — always present, just recoloured */}
        <div className="flex items-center gap-3">
          <Image src={'/logo.png'} alt="AutoRad Logo" width={120} height={120} />
          <span
            className={`font-semibold text-sm transition-colors duration-500 text-5xl ${
              mode === "login" ? "text-white" : "text-slate-900"
            }`}
          >
            AutoRad
          </span>
        </div>

        {/* Copy block — crossfades between login and signup messaging */}
        <div className="relative space-y-5 overflow-hidden">
          {/* Login copy */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              mode === "login"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-blue-300 mb-2">
              Radiology AI
            </p>
            <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
              Welcome back to AutoRad
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              AI-assisted radiology reporting. Review, validate, and sign off
              on structured drafts in seconds.
            </p>
            <div className="space-y-2.5">
              {[
                "PHI masking enabled by default",
                "Low-confidence deferral guardrails",
                "SLA queue under 20s for 95% of jobs",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signup copy */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              mode === "signup"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none absolute inset-0"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-blue-600 mb-2">
              Get started
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 leading-snug mb-3">
              Already have an account?
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              Log in to continue working on your radiology reports and access
              your workspace.
            </p>
            <button
              onClick={() => switchMode("login")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition"
            >
              Login to your account
              <span className="text-slate-400">→</span>
            </button>
          </div>
        </div>

        <p
          className={`text-xs transition-colors duration-500 ${
            mode === "login" ? "text-slate-600" : "text-slate-400"
          }`}
        >
          © {new Date().getFullYear()} AutoRad. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className={`
          flex flex-col justify-center items-center
          w-full md:w-1/2 px-5 sm:px-8 md:px-10
          transition-all duration-500 ease-in-out
          ${mode === "signup"
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
            : "bg-white"}
        `}
      >
        {/* Mobile-only logo */}
        <div className="mb-6 flex items-center gap-3 md:hidden">
          <div
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-colors duration-500 ${
              mode === "signup" ? "bg-white text-slate-900" : "bg-slate-900 text-white"
            }`}
          >
            AR
          </div>
          <span
            className={`font-semibold text-sm transition-colors duration-500 ${
              mode === "signup" ? "text-white" : "text-slate-900"
            }`}
          >
            AutoRad
          </span>
        </div>

        {/* Form wrapper — slides and fades on switch */}
        <div className="w-full max-w-sm">
          <div
            className={`transition-all duration-280 ease-in-out ${
              phase === "out" || phase === "in" ? formExitClass || formEnterClass : "opacity-100 translate-x-0"
            }`}
            style={{ transitionDuration: phase === "out" ? "280ms" : "280ms" }}
          >
            {displayed === "login" ? <LoginForm /> : <SignupForm />}
          </div>

          <p
            className={`mt-4 text-center text-xs transition-colors duration-500 ${
              mode === "signup" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  disabled={animating}
                  className="font-semibold text-blue-600 hover:text-blue-500 transition disabled:opacity-50"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  disabled={animating}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition disabled:opacity-50"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}