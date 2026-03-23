import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Brain,
  Code,
  MagnifyingGlass,
  CheckCircle,
  Lightning,
  Star,
} from "@phosphor-icons/react";

const AGENTS = [
  {
    id: "planner",
    name: "Planner Agent",
    role: "Strategic Planner",
    description: "Breaks complex goals into structured, dependency-aware task graphs with actionable steps.",
    icon: Brain,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    skills: ["Task Decomposition", "DAG Graphs", "Dependency Analysis"],
  },
  {
    id: "researcher",
    name: "Research Agent",
    role: "Information Gatherer",
    description: "Searches the web and synthesizes real-time information to support complex decision-making.",
    icon: MagnifyingGlass,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    skills: ["Web Search", "Summarization", "Fact Checking"],
  },
  {
    id: "coder",
    name: "Coding Agent",
    role: "Senior Engineer",
    description: "Writes, refactors, and debugs code across Python, JavaScript, and Bash.",
    icon: Code,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    skills: ["Python", "JavaScript", "Bash", "Debugging"],
  },
  {
    id: "critic",
    name: "Critic Agent",
    role: "Quality Reviewer",
    description: "Reviews outputs, identifies errors, improves clarity, and ensures high-quality results.",
    icon: CheckCircle,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    skills: ["Code Review", "QA", "Refinement"],
  },
  {
    id: "executor",
    name: "Executor Agent",
    role: "Task Runner",
    description: "Directly executes tasks with a focus on practical, actionable output.",
    icon: Lightning,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    skills: ["Direct Execution", "Code", "Steps"],
  },
  {
    id: "super",
    name: "Super Agent",
    role: "Master Orchestrator",
    description: "The Maximum Agent. Coordinates all tools and agents for complex, multi-step tasks.",
    icon: Star,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    skills: ["All Tools", "Multi-Step", "Python", "JS", "Bash"],
    featured: true,
  },
];

export default function AgentsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Agent Fleet</h1>
        <p className="text-sm text-muted-foreground mt-1">All available agents in your AI OS instance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Card className={`h-full border-border bg-card hover:border-primary/30 transition-colors ${agent.featured ? "border-primary/40" : ""}`}>
              <CardContent className="p-4 md:p-5 flex flex-col gap-3 h-full">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${agent.bg}`}>
                    <agent.icon size={20} weight="duotone" className={agent.color} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wide">Active</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground">{agent.name}</h3>
                    {agent.featured && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-bold uppercase">MAX</span>
                    )}
                  </div>
                  <p className="text-[11px] text-primary font-semibold mb-2">{agent.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary border border-border text-muted-foreground font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
