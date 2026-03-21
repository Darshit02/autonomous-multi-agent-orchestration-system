import requests

def search_web(query: str) -> str:
    url = f"https://duckduckgo.com/?q={query}"
    return f"Search this manually: {url}"