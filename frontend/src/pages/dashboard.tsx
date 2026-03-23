import ChatBox from "@/components/chat /chat-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartBar,
  CheckCircle,
  Timer,
  Robot,
  CircleNotch,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { statsApi, tasksApi, type Stats, type Task } from "@/services/api-service";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [s, t] = await Promise.all([statsApi.get(), tasksApi.list()]);
      setStats(s);
      setTasks(t.slice(0, 8));
    } catch { /* server offline */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { title: "Active Agents", value: stats ? String(stats.active_agents) : "—", icon: ChartBar, trend: "Agents ready", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
    { title: "Tasks Completed", value: stats ? String(stats.tasks_completed) : "—", icon: CheckCircle, trend: `${stats?.tasks_running ?? 0} running now`, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { title: "Total Tasks", value: stats ? String(stats.total_tasks) : "—", icon: Timer, trend: "All time", color: "text-violet-500", bg: "bg-violet-500/10 border-violet-500/20" },
  ];

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.bg}`}>
                    {loading
                      ? <CircleNotch size={16} className="animate-spin text-muted-foreground" />
                      : <stat.icon size={18} weight="duotone" className={stat.color} />
                    }
                  </div>
                  <button onClick={fetchData} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowsClockwise size={14} weight="regular" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{stat.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4" style={{ height: "calc(100dvh - 210px)", minHeight: "400px" }}>
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <ChatBox />
        </div>

        <Card className="border-border bg-card flex flex-col min-h-0">
          <CardHeader className="border-b border-border py-3 px-4">
            <CardTitle className="text-xs font-semibold flex items-center gap-2">
              <Robot size={14} weight="duotone" className="text-primary" />
              Recent Tasks
              {tasks.some((t) => t.status === "running") && (
                <span className="ml-auto text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full animate-pulse font-bold uppercase">Live</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading && (
              <div className="flex justify-center py-8">
                <CircleNotch size={20} className="animate-spin text-muted-foreground" />
              </div>
            )}
            {!loading && tasks.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">No tasks yet. Create one from the Tasks page.</p>
            )}
            {tasks.map((task) => (
              <div key={task.id} className="group p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-foreground truncate max-w-[120px]">{task.title}</span>
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0",
                    task.status === "running" ? "bg-primary/15 text-primary animate-pulse" :
                    task.status === "done" ? "bg-emerald-500/15 text-emerald-500" :
                    task.status === "failed" ? "bg-destructive/15 text-destructive" :
                    "bg-secondary text-muted-foreground"
                  )}>
                    {task.status}
                  </span>
                </div>
                {task.created_at && (
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(task.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
