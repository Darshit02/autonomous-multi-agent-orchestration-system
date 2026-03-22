def stream_response(text: str):
    for word in text.split():
        yield word + " "