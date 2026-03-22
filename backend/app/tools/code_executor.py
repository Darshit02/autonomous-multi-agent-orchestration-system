def execute_python(code: str) -> str:
    dangerous = ["import os", "import sys", "subprocess", "__"]

    if any(d in code for d in dangerous):
        return "Blocked: unsafe code"

    try:
        exec_globals = {}
        exec(code, exec_globals)

        return str(exec_globals)

    except Exception as e:
        return str(e)