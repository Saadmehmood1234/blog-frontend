"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Email and Password are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Login failed");
        return;
      }
      if (data.message?.toLowerCase().includes("verification email resent")) {
        toast.success(data.message);
        return;
      }
      setEmail("");
      setPassowrd("");

      toast.success(data.message || "Login successful");
      router.push("/admin/analytics");
    } catch {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">
          Login to TechBlog
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Welcome back! Please enter your details.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              onChange={(e) => setPassowrd(e.target.value)}
              type="password"
              value={password}
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button className="w-full  cursor-pointer rounded-lg bg-primary py-2 text-sm font-medium text-white hover:opacity-90">
            {loading ? "Login..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/admin/auth/signup" className="font-medium text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
