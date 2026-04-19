import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Activity, Settings as Cog } from "lucide-react";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/", label: "Today", icon: Home, end: true },
  { to: "/library", label: "Library", icon: BookOpen, end: false },
  { to: "/progress", label: "Progress", icon: Activity, end: false },
  { to: "/settings", label: "Settings", icon: Cog, end: false },
];

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream-50 text-ink-900">
      <header className="sticky top-0 z-10 border-b border-ink-100/70 bg-cream-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-sage-200 grid place-items-center">
              <span className="font-display text-sage-800">4T</span>
            </div>
            <div className="font-display text-lg text-sage-900">
              Fourth Trimester
            </div>
          </div>
          <div className="hidden gap-1 sm:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                    isActive
                      ? "bg-sage-700 text-white"
                      : "text-ink-700 hover:bg-sage-100",
                  )
                }
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-6">
        <Outlet />
      </main>
      <nav
        className="sticky bottom-0 z-10 border-t border-ink-100/70 bg-cream-50/90 backdrop-blur sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-3xl items-stretch justify-between px-2">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center gap-1 py-2 text-xs",
                  isActive ? "text-sage-800" : "text-ink-500",
                )
              }
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <footer className="mx-auto w-full max-w-3xl px-5 pb-6 pt-2 text-center text-xs text-ink-400 sm:pb-6">
        This app is informational only — always defer to your OB, midwife, or
        pelvic-floor PT.
      </footer>
    </div>
  );
}
