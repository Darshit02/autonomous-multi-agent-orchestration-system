import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { useThemeStore } from "@/store/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  SquaresFour,
  ChatTeardrop,
  ListChecks,
  Robot,
  Gear,
  SignOut,
  User,
  Sun,
  Moon,
  Cpu,
  List,
  X,
  Lightning,
  TriangleDashedIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: SquaresFour, label: "Dashboard", path: "/dashboard" },
  { icon: ChatTeardrop, label: "Chat", path: "/chat" },
  { icon: ListChecks, label: "Tasks", path: "/tasks" },
  { icon: Robot, label: "Agents", path: "/agents" },
  { icon: Gear, label: "Settings", path: "/settings" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAppStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentLabel = navItems.find((i) => i.path === location.pathname)?.label ?? "AI OS";
  const isDark = theme === "dark";

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* ── Mobile backdrop overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            key="sidebar"
            initial={false}
            animate={{ x: sidebarOpen ? 0 : undefined }}
            className={cn(
              "fixed md:relative z-40 flex flex-col h-full w-60 shrink-0 bg-sidebar border-r border-sidebar-border",
              // Mobile: hidden by default, slide in
              "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:transition-transform max-md:duration-300 max-md:ease-in-out",
              sidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
            )}
          >
            {/* Logo */}
            <div className="h-16 flex items-center gap-1 px-5 border-b border-sidebar-border shrink-0">
              <div className="w-8 h-8 rounded-xl  flex items-center justify-center">
                <TriangleDashedIcon className="text-lg"/>
              </div>
              <span className="text-base font-bold tracking-tight text-sidebar-foreground">AI OS</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              {/* Close on mobile */}
              <button
                className="md:hidden ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 relative group",
                      isActive
                        ? "text-primary"
                        : "text-sidebar-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                    )}
                    <item.icon
                      size={18}
                      weight={isActive ? "duotone" : "regular"}
                      className={cn("relative z-10 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User + Theme toggle */}
            <div className="p-3 border-t border-sidebar-border space-y-1 shrink-0">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                {isDark ? <Sun size={17} weight="duotone" /> : <Moon size={17} weight="duotone" />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                <div className={cn(
                  "ml-auto w-9 h-5 rounded-full border border-border flex items-center px-0.5 transition-colors",
                  isDark ? "bg-secondary" : "bg-primary/15 border-primary/25"
                )}>
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-primary transition-transform duration-300",
                    isDark ? "translate-x-0" : "translate-x-4"
                  )} />
                </div>
              </button>

              {/* User */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <User size={14} weight="duotone" className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {user?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{user?.email || "guest"}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <SignOut size={16} weight="regular" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 md:h-16 bg-card/60 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <List size={22} weight="regular" />
            </button>
            <div className="flex items-center gap-2">
              <Lightning size={14} weight="duotone" className="text-primary hidden md:block" />
              <h2 className="text-sm font-semibold text-foreground">{currentLabel}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile theme toggle */}
            <button
              onClick={toggleTheme}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              {isDark ? <Sun size={17} weight="duotone" /> : <Moon size={17} weight="duotone" />}
            </button>
            <div className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-secondary border border-border hidden md:block">
              v1.0.0
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
