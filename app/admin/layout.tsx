"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Layers,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  // If on login page, render children directly without dashboard chrome
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setAdminUser(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkSession();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#1E8E3E] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-gray-600">ઓનર પોર્ટલ લોડ થઈ રહ્યું છે...</p>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", labelGu: "ડેશબોર્ડ", href: "/admin", icon: LayoutDashboard },
    { label: "Products", labelGu: "પ્રોડક્ટ્સ", href: "/admin/products", icon: Package },
    { label: "Inventory", labelGu: "સ્ટોક / ઇન્વેન્ટરી", href: "/admin/inventory", icon: Boxes },
    { label: "Categories", labelGu: "કેટેગરીઝ", href: "/admin/categories", icon: Layers },
    { label: "Customer Enquiries", labelGu: "ગ્રાહક પૂછપરછ", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Settings", labelGu: "દુકાન સેટિંગ્સ", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row text-gray-900">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-[#0f172a] text-white p-4 shrink-0 border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-[#1E8E3E] flex items-center justify-center text-white font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight text-white leading-none">
                રાધે હાર્ડવેર
              </h2>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                Admin Control
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#1E8E3E] text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-70 ml-auto">{item.labelGu}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>વેબસાઈટ જુઓ</span>
            </span>
          </Link>

          <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between">
            <div className="truncate mr-2">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || "Owner"}</p>
              <p className="text-[10px] text-slate-400 truncate">{adminUser?.email || "admin"}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top App Bar */}
      <header className="md:hidden bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-white">રાધે હાર્ડવેર Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs flex items-center gap-1 font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[52px] bottom-0 bg-slate-950/90 backdrop-blur-md z-50 p-4 overflow-y-auto">
          <div className="bg-[#0f172a] rounded-2xl p-4 border border-slate-800 shadow-2xl space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              મેનૂ નેવિગેશન
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                    isActive
                      ? "bg-[#1E8E3E] text-white"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[11px] opacity-70">{item.labelGu}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-semibold">{adminUser?.name || "Owner"}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-bold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
