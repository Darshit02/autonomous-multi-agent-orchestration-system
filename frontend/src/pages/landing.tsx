import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Code,
  Shield,
  Lightning,
  ArrowRight,
  Globe,
  Cpu,
  Robot,
} from "@phosphor-icons/react";

const features = [
  { icon: Brain, title: "Multi-Agent Orchestration", desc: "Plan, research, code, and critique — all agents working together.", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: Code, title: "Multi-Language Execution", desc: "Execute Python, JavaScript, and Bash directly within your workflows.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Globe, title: "Web-Connected Research", desc: "Agents search the web in real-time to gather up-to-date information.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: Lightning, title: "DAG Task Execution", desc: "Break tasks into a dependency graph and run steps in parallel.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: Shield, title: "Secure by Design", desc: "Sandboxed execution and bearer-token auth in every layer.", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  { icon: Cpu, title: "Vector Memory", desc: "Semantic memory retrieves relevant context for richer reasoning.", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Cpu size={16} weight="duotone" className="text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">AI OS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 text-xs sm:text-sm">
                Get Started <ArrowRight size={13} weight="bold" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-24 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-8">
              <Robot size={13} weight="duotone" /> Multi-Agent AI Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Your Intelligence,{" "}
              <span className="bg-linear-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Orchestrated.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed px-4">
              AI OS orchestrates intelligent agents, automates complex tasks, and runs multi-language code — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register">
                <Button className="h-11 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-full gap-2 w-full sm:w-auto">
                  Try for Free <ArrowRight size={15} weight="bold" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-11 px-8 text-base rounded-full border-border text-muted-foreground hover:text-foreground hover:bg-secondary w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-muted-foreground text-sm sm:text-base">AI-powered, code-ready, fully orchestrated.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${feat.bg}`}>
                  <feat.icon size={20} weight="duotone" className={feat.color} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-px rounded-2xl bg-linear-to-br from-primary/40 via-violet-500/20 to-transparent">
            <div className="p-8 sm:p-10 rounded-2xl bg-card">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to orchestrate?</h2>
              <p className="text-muted-foreground text-sm mb-8">Start building AI-powered workflows today.</p>
              <Link to="/register">
                <Button className="h-11 px-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu size={16} weight="duotone" className="text-primary" />
            <span className="font-bold text-sm">AI OS</span>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 AI OS. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
