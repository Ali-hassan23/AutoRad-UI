const API_BASE = "/api/admin";

const fetchOpts: RequestInit = {
  credentials: "include",
};

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOpts,
    cache: "no-store",
    ...init,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = err.detail;
    const message =
      typeof detail === "string"
        ? detail
        : res.status === 403
          ? "Admin access required"
          : "Request failed";
    throw new Error(message);
  }

  return res.json();
}

export type AdminOverview = {
  users: {
    total: number;
    active: number;
    admins: number;
    new_this_week: number;
  };
  studies: {
    total: number;
    today: number;
    this_week: number;
  };
  reports: {
    draft: number;
    final: number;
  };
  system: {
    model_loaded: boolean;
    avg_processing_time_seconds?: number | null;
  };
};

export type AdminUser = {
  id: number;
  email: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
  auth_provider: string;
  created_at: string;
  study_count: number;
};

export type AdminStudyListItem = {
  study_id: string;
  display_id: string;
  mrn: string;
  patient_name?: string | null;
  status: string;
  user_id: number;
  user_email: string;
  impression_snippet?: string | null;
  processing_time_seconds?: number | null;
  created_at: string;
};

export type AdminStudyDetail = {
  study_id: string;
  display_id: string;
  filename?: string | null;
  status: string;
  created_at: string;
  updated_at?: string | null;
  owner_id: number;
  owner_email: string;
  owner_name?: string | null;
  mrn: string;
  patient_name?: string | null;
  date_of_birth?: string | null;
  age?: string | null;
  gender?: string | null;
  referring_physician?: string | null;
  ward_opd?: string | null;
  clinical_indication?: string | null;
  is_xray?: boolean | null;
  is_chest_xray?: boolean | null;
  gate_confidence?: string | null;
  gate_reason?: string | null;
  processing_time_seconds?: number | null;
  raw_report?: string | null;
  refined_report?: string | null;
  edited_content?: string | null;
  report_status?: string | null;
};

export type AdminAnalytics = {
  reports_per_day: { date: string; count: number }[];
  active_users_per_day: { date: string; count: number }[];
  avg_processing_time_per_day: { date: string; avg: number }[];
  events_by_type: Record<string, number>;
};

export type AuditLogEntry = {
  id: string;
  actor_id?: number | null;
  actor_email?: string | null;
  action: string;
  resource_type: string;
  resource_id?: string | null;
  ip_address?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
};

export type AdminHealth = {
  api_status: string;
  model_loaded: boolean;
  database: string;
  upload_dir_writable: boolean;
};

export function getAdminOverview() {
  return adminFetch<AdminOverview>("/overview");
}

export function listAdminUsers(params?: {
  skip?: number;
  limit?: number;
  search?: string;
  role?: string;
  is_active?: boolean;
}) {
  const qs = new URLSearchParams();
  if (params?.skip != null) qs.set("skip", String(params.skip));
  if (params?.limit != null) qs.set("limit", String(params.limit));
  if (params?.search) qs.set("search", params.search);
  if (params?.role) qs.set("role", params.role);
  if (params?.is_active != null) qs.set("is_active", String(params.is_active));
  const q = qs.toString();
  return adminFetch<{ items: AdminUser[]; total: number }>(
    `/users${q ? `?${q}` : ""}`
  );
}

export function updateAdminUser(
  userId: number,
  body: { role?: "user" | "admin"; is_active?: boolean }
) {
  return adminFetch<AdminUser>(`/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function listAdminStudies(params?: {
  skip?: number;
  limit?: number;
  user_id?: number;
  mrn?: string;
  status?: string;
}) {
  const qs = new URLSearchParams();
  if (params?.skip != null) qs.set("skip", String(params.skip));
  if (params?.limit != null) qs.set("limit", String(params.limit));
  if (params?.user_id != null) qs.set("user_id", String(params.user_id));
  if (params?.mrn) qs.set("mrn", params.mrn);
  if (params?.status) qs.set("status", params.status);
  const q = qs.toString();
  return adminFetch<{ items: AdminStudyListItem[]; total: number }>(
    `/studies${q ? `?${q}` : ""}`
  );
}

export function getAdminStudy(studyId: string) {
  return adminFetch<AdminStudyDetail>(`/studies/${studyId}`);
}

export function getAdminAnalytics(range: "7d" | "30d" | "90d" = "7d") {
  return adminFetch<AdminAnalytics>(`/analytics?range=${range}`);
}

export function listAuditLogs(params?: {
  skip?: number;
  limit?: number;
  action?: string;
  resource_type?: string;
}) {
  const qs = new URLSearchParams();
  if (params?.skip != null) qs.set("skip", String(params.skip));
  if (params?.limit != null) qs.set("limit", String(params.limit));
  if (params?.action) qs.set("action", params.action);
  if (params?.resource_type) qs.set("resource_type", params.resource_type);
  const q = qs.toString();
  return adminFetch<{ items: AuditLogEntry[]; total: number }>(
    `/audit-logs${q ? `?${q}` : ""}`
  );
}

export function getAdminHealth() {
  return adminFetch<AdminHealth>("/health");
}

export function adminStudyImageUrl(studyId: string): string {
  return `/api/admin/studies/${studyId}/image`;
}

export function adminStudyHeatmapUrl(studyId: string): string {
  return `/api/admin/studies/${studyId}/heatmap`;
}
