import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { api } from "@/services/api";
import { Cpu, ArrowRight, CircleNotch, TriangleDashedIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken, setUser } = useAppStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await api.post("/register", { email, password });
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const loginRes = await api.post("/login", formData);
      const { access_token, user } = loginRes.data;
      setToken(access_token);
      setUser(user || { id: "1", email });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Try a different email.");
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
        <div className="flex flex-col items-center justify-center gap-1 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <TriangleDashedIcon className="text-5xl text-green-500"/>
          </div>
          <span className="text-xl font-bold">AI OS</span>
        </div>

        <div className="p-px rounded-2xl bg-linear-to-b from-border to-transparent">
          <div className="p-6 rounded-2xl bg-card space-y-5">
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">Create account</h1>
              <p className="text-xs text-muted-foreground mt-1">Start orchestrating AI agents today</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">
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
                className="w-full h-10 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-md gap-2"
                disabled={isLoading}
              >
                {isLoading ? <CircleNotch size={16} className="animate-spin" /> : ""}
                {isLoading ? "Creating account…" : "Create Account"}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
