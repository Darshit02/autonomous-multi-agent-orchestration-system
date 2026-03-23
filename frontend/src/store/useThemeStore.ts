import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () =>
        set((s) => {
          const next: Theme = s.theme === "dark" ? "light" : "dark";
          applyTheme(next);
          return { theme: next };
        }),
      setTheme: (t) => {
        applyTheme(t);
        set({ theme: t });
      },
    }),
    { name: "ai-os-theme" }
  )
);

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}
