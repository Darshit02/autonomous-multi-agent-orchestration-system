from app.services.llm_service import generate_response


def generate_plan(user_input: str):
    prompt = f""" 
    You are a task planner AI.

Convert the user request into a list of actionable tasks.

Rules:
- Break into clear steps
- Keep tasks short and specific
- Return as numbered list

User Request:
{user_input}
"""

    response = generate_response(prompt)

    # simple parsing (we improve later)
    tasks = [line.strip() for line in response.split("\n") if line.strip()]

    return tasks
