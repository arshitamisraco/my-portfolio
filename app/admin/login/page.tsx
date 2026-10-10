import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-token";

async function login(formData: FormData) {
  "use server";
  const token = await adminToken();
  if (!token || formData.get("password") !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <section className="container-site flex justify-center py-section">
      <form action={login} className="w-full max-w-sm rounded-frame border border-line bg-surface-raised p-8">
        <h1 className="font-display text-h2 text-ink">Analytics</h1>
        <label htmlFor="password" className="mt-6 block text-caption text-ink-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-card border border-line bg-bg px-4 py-3 text-body text-ink"
        />
        {error && <p className="mt-3 text-caption text-accent-deep">That password didn&rsquo;t match.</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-pill bg-accent-strong px-6 py-3 font-medium text-on-accent transition-colors hover:bg-accent-deep"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
