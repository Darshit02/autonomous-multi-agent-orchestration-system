import subprocess

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

def execute_javascript(code: str) -> str:
    try:
        result = subprocess.run(["node", "-e", code], capture_output=True, text=True, timeout=10)
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        return str(e)

def execute_bash(code: str) -> str:
    try:
        result = subprocess.run(["bash", "-c", code], capture_output=True, text=True, timeout=10)
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        return str(e)