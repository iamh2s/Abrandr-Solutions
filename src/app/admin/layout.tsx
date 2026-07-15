import type { ReactNode } from "react";

export const metadata = { title: "Admin Panel | aBrandr" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-dark">{children}</div>;
}
