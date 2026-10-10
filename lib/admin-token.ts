// Session cookie value = SHA-256 of the admin password (salted), so the
// password itself never sits in the browser. Web Crypto works in both the
// Edge middleware and Node server actions.
export const ADMIN_COOKIE = "admin_session";

export async function adminToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const bytes = new TextEncoder().encode(`arshita-portfolio-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
