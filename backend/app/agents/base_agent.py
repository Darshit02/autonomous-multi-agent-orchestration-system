class BaseAgent:
    name = "base"
    description = "Generic agent"
    skills = []

    def __init__(self, name: str):
        self.name = name

    def run(self, task: str):
        raise NotImplementedError