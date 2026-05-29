// lib/auth.ts - Client-safe authentication helpers

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  role?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  profile_picture?: string;
  created_at: string;
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<TokenResponse> {
  const formData = new URLSearchParams();
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Login failed");
  }

  return response.json();
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<UserProfile> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      role: data.role || "user",
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Registration failed");
  }

  return response.json();
}

/**
 * Get current user profile from the cookie-backed session.
 */
export async function getCurrentUser(): Promise<UserProfile> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  profile_picture?: string;
  created_at: string;
}

/**
 * Logout user by clearing the cookie-backed session.
 * Note: Caller is responsible for navigation after logout completes.
 */
export async function logout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Keep going even if the request fails
  }

  if (typeof window !== "undefined") {
    sessionStorage.removeItem("latest_report");
  }
}
