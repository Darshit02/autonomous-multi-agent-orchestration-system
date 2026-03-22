import json
from app.tools.registry import TOOLS

def execute_tool(response: str):
    try:
        data = json.loads(response)

        tool_name = data.get("tool")
        tool_input = data.get("input")

        if tool_name not in TOOLS:
            return "Invalid tool"

        return TOOLS[tool_name](tool_input)

    except Exception as e:
        return f"Tool execution error: {str(e)}"