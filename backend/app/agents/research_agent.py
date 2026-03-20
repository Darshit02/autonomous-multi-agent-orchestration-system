from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response


class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__("Research")

    def run(self, task: str) -> str:
        prompt = f"""
ROLE:
You are an expert research analyst.

OBJECTIVE:
Provide clear, factual, and useful insights.

TASK:
{task}

INSTRUCTIONS:
- Focus on key insights only
- Avoid fluff
- Use bullet points
- Be accurate and practical

OUTPUT FORMAT:
- Key Insight 1
- Key Insight 2
- Key Insight 3

FINAL ANSWER:
"""
        return generate_response(prompt)
