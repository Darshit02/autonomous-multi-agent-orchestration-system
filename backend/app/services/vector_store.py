import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim=384):
        self.index = faiss.IndexFlatL2(dim)
        self.texts = []

    def add(self, text, embedding):
        self.index.add(np.array([embedding]).astype("float32"))
        self.texts.append(text)

    def search(self, query_embedding, k=3):
        distances, indices = self.index.search(
            np.array([query_embedding]).astype("float32"), k
        )
        return [self.texts[i] for i in indices[0] if i < len(self.texts)]

vector_store = VectorStore()