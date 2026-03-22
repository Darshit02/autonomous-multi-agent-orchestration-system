from app.tools.code_executor import execute_python
from app.tools.web_search import search_web

TOOLS = {
    "python": execute_python,
    "search": search_web
}