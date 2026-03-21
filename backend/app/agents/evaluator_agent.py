from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response


class EvaluatorAgent(BaseAgent):
    def __init__(self):
        super().__init__("Evaluator")

    def run(self, result: str) -> dict:
        prompt = f"""
ROLE:
You are a strict evaluator.

OBJECTIVE:
Evaluate the quality of the result.

RESULT:
{result}

INSTRUCTIONS:
- Check correctness
- Check completeness
- Check clarity

OUTPUT FORMAT (STRICT JSON):
{{
  "score": 1-10,
  "feedback": "what is wrong or missing"
}}
"""

        response = generate_response(prompt)

        try:
            import json
            return json.loads(response)
        except:
            return {"score": 5, "feedback": "Parsing failed"}
