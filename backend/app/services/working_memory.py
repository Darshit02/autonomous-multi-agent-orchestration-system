class WorkingMemory:
    def __init__(self):
        self.logs = []

    def add(self, agent_name: str, task: str, result: str):
        self.logs.append({
            "agent": agent_name,
            "task" : task,
            "result" : result
        })

    def get_context(self):
        context = ""
        for log in self.logs:
            context += f"""
Agent: {log['agent']}
Task: {log['task']}
Result: {log['result']}
"""
        return context.strip()