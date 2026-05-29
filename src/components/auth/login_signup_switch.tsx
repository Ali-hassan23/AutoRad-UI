"use client";

import { useState } from "react";
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
            ? "bg-gradient-to-br from-primary via-primary/90 to-secondary"
            : "bg-white border-r border-border"}
        `}
      >
        {/* Logo — always present, just recoloured */}
        <div className="flex items-center gap-3">
          <Image src={'/logo.png'} alt="AutoRad Logo" width={120} height={120} />
          <span
            className={`font-semibold text-sm transition-colors duration-500 text-5xl ${
              mode === "login" ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            
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
            <p className="text-xs uppercase tracking-[0.14em] text-secondary mb-2">
              Radiology AI
            </p>
            <h1 className="text-3xl font-semibold text-primary-foreground leading-snug mb-3">
              Welcome back to AutoRad
            </h1>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs mb-5">
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
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90 text-sm">{feat}</span>
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
            <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-2">
              Get started
            </p>
            <h1 className="text-3xl font-semibold text-foreground leading-snug mb-3">
              Already have an account?
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
              Log in to continue working on your radiology reports and access
              your workspace.
            </p>
            <button
              onClick={() => switchMode("login")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-muted/30 transition"
            >
              Login to your account
              <span className="text-muted-foreground">→</span>
            </button>
          </div>
        </div>

        <p
          className={`text-xs transition-colors duration-500 ${
            mode === "login" ? "text-primary-foreground/70" : "text-muted-foreground"
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
            ? "bg-gradient-to-br from-primary via-primary/90 to-secondary"
            : "bg-background"}
        `}
      >
        {/* Mobile-only logo */}
        <div className="mb-6 flex items-center gap-3 md:hidden">
          <div
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-colors duration-500 ${
              mode === "signup" ? "bg-card text-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            AR
          </div>
          <span
            className={`font-semibold text-sm transition-colors duration-500 ${
              mode === "signup" ? "text-primary-foreground" : "text-foreground"
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
              mode === "signup" ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  disabled={animating}
                  className="font-semibold cursor-pointer text-primary hover:text-primary/80 transition disabled:opacity-50"
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
                  className="font-semibold text-muted underline cursor-pointer hover:text-secondary/80 transition disabled:opacity-50"
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
