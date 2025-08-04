import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Offline Education",
  description: "Sign in or create an account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      {children}
    </main>
  );
}
