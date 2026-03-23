from app.tools.code_executor import execute_python, execute_javascript, execute_bash
from app.tools.web_search import search_web
from app.tools.system_tool import list_dir, read_file, write_file, execute_shell

TOOLS = {
    "python": execute_python,
    "javascript": execute_javascript,
    "bash": execute_bash,
    "search": search_web,
    "list_dir": list_dir,
    "read_file": read_file,
    "write_file": write_file,
    "shell": execute_shell
}