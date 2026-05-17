import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DTE Governed Workflow Dashboard",
  description: "Professional tax engagement orchestration system with governed execution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-slate-100">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 fixed left-0 top-0 overflow-y-auto">
          <Link href="/" className="block mb-8">
            <div className="text-2xl font-bold">DTE</div>
            <div className="text-xs text-slate-400 mt-1">Workflow Dashboard</div>
          </Link>

          <nav className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Navigation</p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    🏠 Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engagements"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    📋 All Engagements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Quick Test Scenarios</p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/engagements/eng-001"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    🚨 Active Escalations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engagements/eng-002"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    ⏳ Ready for Approval
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engagements/eng-003"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    ✅ Approved
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engagements/eng-004"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    ⚠️ Multiple Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engagements/eng-005"
                    className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  >
                    📝 Just Created
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Governance Rules</p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>✓ State Machine Control</li>
                <li>✓ Approval Gate</li>
                <li>✓ Escalation Blocking</li>
                <li>✓ Audit Logging</li>
              </ul>
            </div>
          </nav>

          <div className="mt-12 pt-6 border-t border-slate-700 text-xs text-slate-400">
            <p><strong>Tech Stack:</strong></p>
            <p>Next.js 14</p>
            <p>React + TypeScript</p>
            <p>Tailwind CSS</p>
            <p>Mock Data</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}
