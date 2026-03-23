import { useAppStore } from "@/store/useAppStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, DesktopTower, SignOut, ShieldWarning, Sun, Moon, Robot } from "@phosphor-icons/react";

export default function SettingsPage() {
  const { user, logout } = useAppStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-5">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and system preferences.</p>
      </div>

      {/* Profile */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User size={16} weight="duotone" className="text-primary" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <User size={22} weight="duotone" className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{user?.email?.split("@")[0] || "User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "No email"}</p>
            </div>
          </div>
          <div className="border-t border-border pt-2 space-y-0">
            {[
              { label: "User ID", value: String(user?.id ?? "—"), mono: true },
              { label: "Email", value: user?.email ?? "—" },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className={`text-xs text-foreground ${mono ? "font-mono bg-secondary px-2 py-0.5 rounded-md" : ""}`}>{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {isDark ? <Moon size={16} weight="duotone" className="text-primary" /> : <Sun size={16} weight="duotone" className="text-primary" />}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground mt-0.5">Currently using {isDark ? "dark" : "light"} mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary border border-border hover:border-primary/40 transition-all text-xs font-medium text-foreground"
            >
              {isDark ? <Sun size={14} weight="duotone" className="text-amber-400" /> : <Moon size={14} weight="duotone" className="text-primary" />}
              Switch to {isDark ? "Light" : "Dark"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* System */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <DesktopTower size={16} weight="duotone" className="text-primary" />
            System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { label: "Backend URL", value: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api" },
            { label: "LLM Provider", value: "Google Gemini" },
            { label: "Embedding Model", value: "all-MiniLM-L6-v2" },
            { label: "Code Runtimes", value: "Python · JavaScript · Bash" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-xs text-foreground font-medium">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Agents */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Robot size={16} weight="duotone" className="text-primary" />
            Agent Registry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["Planner", "Research", "Coder", "Critic", "Executor", "Super"].map((name) => (
              <span key={name} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">{name}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
            <ShieldWarning size={16} weight="duotone" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-foreground">Sign out of AI OS</p>
              <p className="text-xs text-muted-foreground">You'll need to sign in again to access your account.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 shrink-0"
              onClick={handleLogout}
            >
              <SignOut size={14} weight="regular" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
