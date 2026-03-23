def is_failure(result: str):
    failure_signals = [
        "error",
        "exception",
        "failed",
        "invalid",
        "traceback"
    ]

    result_lower = result.lower()

    return any(f in result_lower for f in failure_signals)