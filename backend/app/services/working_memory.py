import threading

class WorkingMemory:
    def __init__(self):
        self.logs = []
        self.lock = threading.Lock()

    def add(self, agent_name, task, result):
        with self.lock:
            self.logs.append({
                "agent": agent_name,
                "task": task,
                "result": result
            })

    def get_context(self):
        with self.lock:
            context = ""
            for log in self.logs:
                context += f"""
Agent: {log['agent']}
Task: {log['task']}
Result: {log['result']}
"""
            return context.strip()