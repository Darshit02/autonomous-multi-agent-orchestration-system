import { api } from "./api";

// ─── Types ────────────────────────────────────

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "running" | "done" | "failed";
  result: string | null;
  created_at: string | null;
}

export interface Stats {
  active_agents: number;
  tasks_completed: number;
  tasks_running: number;
  total_tasks: number;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

// ─── Tasks API ────────────────────────────────

export const tasksApi = {
  /** Create a task and start background execution */
  create: async (description: string, title?: string): Promise<Task> => {
    const res = await api.post("/tasks", { description, title });
    return res.data;
  },

  /** List all tasks for the current user */
  list: async (): Promise<Task[]> => {
    const res = await api.get("/tasks");
    return res.data;
  },

  /** Get a single task by id (polls status/result) */
  get: async (id: number): Promise<Task> => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },
};

// ─── Stats API ────────────────────────────────

export const statsApi = {
  get: async (): Promise<Stats> => {
    const res = await api.get("/stats");
    return res.data;
  },
};

// ─── Chat API ─────────────────────────────────

export const chatApi = {
  send: async (message: string, userId: string): Promise<string> => {
    const res = await api.post("/chat", { message, user_id: userId });
    return res.data.response;
  },
};
