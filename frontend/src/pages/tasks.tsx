import { useState, useEffect, useCallback } from "react";
import { tasksApi, type Task } from "@/services/api-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleNotch,
  Plus,
  PaperPlaneTilt,
  CheckCircle,
  Timer,
  Lightning,
  CaretDown,
  CaretUp,
  Warning,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await tasksApi.list();
      setTasks(data);
    } catch { /* server offline */ }
    finally { setInitialLoading(false); }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Auto-poll while tasks are running
  useEffect(() => {
    const hasRunning = tasks.some((t) => t.status === "running" || t.status === "pending");
    if (!hasRunning) return;
    const interval = setInterval(fetchTasks, 4000);
    return () => clearInterval(interval);
  }, [tasks, fetchTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const task = await tasksApi.create(description.trim(), title || undefined);
      setTasks((prev) => [task, ...prev]);
      setTitle("");
      setDescription("");
      setExpandedId(task.id);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed. Is the server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusConfig: Record<Task["status"], { label: string; cls: string; icon: React.ElementType }> = {
    pending: { label: "Pending", cls: "bg-secondary text-muted-foreground", icon: Timer },
    running: { label: "Running", cls: "bg-primary/15 text-primary animate-pulse", icon: Lightning },
    done: { label: "Done", cls: "bg-emerald-500/15 text-emerald-500", icon: CheckCircle },
    failed: { label: "Failed", cls: "bg-destructive/15 text-destructive", icon: Warning },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-5">
      {/* Create Task */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Plus size={16} weight="bold" className="text-primary" />
            New Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Task title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors"
            />
            <textarea
              placeholder="Describe what you want the AI to do… (e.g. 'Research the best Python async libraries')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none focus:border-primary/60 transition-colors"
            />
            {error && (
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              {isSubmitting
                ? <CircleNotch size={16} className="animate-spin" />
                : <PaperPlaneTilt size={16} weight="duotone" />
              }
              {isSubmitting ? "Submitting to agents…" : "Execute Task"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Task List */}
      {initialLoading ? (
        <div className="flex justify-center py-12">
          <CircleNotch size={22} className="animate-spin text-muted-foreground" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-14">
          <div className="w-13 h-13 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lightning size={24} weight="duotone" className="text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">No tasks yet</p>
          <p className="text-xs text-muted-foreground">Create your first task above to get started.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Task History ({tasks.length})
            </h3>
            {tasks.some((t) => t.status === "running") && (
              <span className="text-[10px] text-primary flex items-center gap-1.5 animate-pulse">
                <CircleNotch size={11} className="animate-spin" /> Polling for updates…
              </span>
            )}
          </div>

          <AnimatePresence initial={false}>
            {tasks.map((task) => {
              const cfg = statusConfig[task.status] ?? statusConfig.pending;
              const StatusIcon = cfg.icon;
              const isExpanded = expandedId === task.id;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border bg-card rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center gap-3 p-3.5 md:p-4 text-left hover:bg-white/3 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : task.id)}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center border shrink-0",
                      task.status === "done" ? "bg-emerald-500/10 border-emerald-500/20" :
                      task.status === "running" ? "bg-primary/10 border-primary/20" :
                      task.status === "failed" ? "bg-destructive/10 border-destructive/20" :
                      "bg-secondary border-border"
                    )}>
                      <StatusIcon
                        size={15}
                        weight="duotone"
                        className={cn(
                          task.status === "done" ? "text-emerald-500" :
                          task.status === "running" ? "text-primary" :
                          task.status === "failed" ? "text-destructive" :
                          "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{task.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {task.created_at ? new Date(task.created_at).toLocaleString() : "Just now"}
                      </p>
                    </div>
                    <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0", cfg.cls)}>
                      {cfg.label}
                    </span>
                    {isExpanded
                      ? <CaretUp size={14} weight="bold" className="text-muted-foreground shrink-0" />
                      : <CaretDown size={14} weight="bold" className="text-muted-foreground shrink-0" />
                    }
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                          <p className="text-[11px] font-semibold text-muted-foreground">Prompt</p>
                          <p className="text-xs text-foreground bg-secondary rounded-lg px-3 py-2 leading-relaxed">{task.description}</p>

                          {(task.status === "running" || task.status === "pending") && (
                            <div className="flex items-center gap-2 text-xs text-primary py-1">
                              <CircleNotch size={12} className="animate-spin" />
                              Agents are working on this…
                            </div>
                          )}

                          {task.result && (
                            <>
                              <p className="text-[11px] font-semibold text-muted-foreground mt-2">Result</p>
                              <pre className="text-xs text-foreground bg-secondary rounded-lg px-3 py-2 leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-56">
                                {task.result}
                              </pre>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
