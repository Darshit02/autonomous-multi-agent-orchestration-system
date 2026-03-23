import os
import subprocess

def list_dir(path: str = "."):
    try:
        return os.listdir(path)
    except Exception as e:
        return str(e)

def read_file(path: str):
    try:
        with open(path, 'r') as f:
            return f.read()
    except Exception as e:
        return str(e)

def write_file(path: str, content: str):
    try:
        with open(path, 'w') as f:
            f.write(content)
        return f"Successfully wrote to {path}"
    except Exception as e:
        return str(e)

def execute_shell(command: str):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=10)
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
    except Exception as e:
        return str(e)
