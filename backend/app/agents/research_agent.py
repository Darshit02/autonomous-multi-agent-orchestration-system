from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response
from app.tools.web_search import search_web


class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__("Research")

    def run(self, task: str, context: str = "") -> str:
        search_result = search_web(task)
        prompt = f"""
ROLE:
You are an expert research analyst.

OBJECTIVE:
Provide clear, factual, and useful insights.


CONTEXT (IMPORTANT):
Below is compressed, relevant memory from previous steps.

{context}

TASK:
{task}

SEARCH:
{search_result}


INSTRUCTIONS:
- Use context only if helpful
- Build on previous work
- Avoid repetition
- Use search hint if needed
- Provide useful insights
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
