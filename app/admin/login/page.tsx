"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen -mt-16 flex items-center justify-center px-6 bg-cream">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-rose rounded-2xl p-8 shadow-sm"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-charcoal-light mb-2">
          Admin
        </p>
        <h1 className="font-serif text-2xl text-charcoal mb-6">Manage Photos</h1>

        <label htmlFor="password" className="block text-xs tracking-widest uppercase text-charcoal-light mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-rose rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-charcoal transition-colors"
          required
          autoFocus
        />

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full bg-charcoal text-white py-3 text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
