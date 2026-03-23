import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { api } from "@/services/api";
import { Cpu, ArrowRight, CircleNotch, TriangleDashedIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken, setUser } = useAppStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const response = await api.post("/login", formData);
      const { access_token, user } = response.data;
      setToken(access_token);
      setUser(user || { id: "1", email });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-primary/8 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-sm"
      >
        <div className="flex items-center justify-center flex-col gap-1 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <TriangleDashedIcon className="text-5xl text-green-500"/>
          </div>
          <span className="text-xl font-bold">AI OS</span>
        </div>

        <div className="p-px rounded-2xl bg-linear-to-b from-border to-transparent">
          <div className="p-6 rounded-2xl bg-card space-y-5">
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">Welcome back</h1>
              <p className="text-xs text-muted-foreground mt-1">Sign in to your AI OS account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              {error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2.5">{error}</div>
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3.5 bg-secondary border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-3.5 bg-secondary border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors"
              />
              <Button
                type="submit"
                className="w-full cursor-pointer h-10 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                disabled={isLoading}
              >
                {isLoading ? <CircleNotch size={16} className="animate-spin" /> : ""}
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
