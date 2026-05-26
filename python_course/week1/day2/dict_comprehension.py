def create_word_lengths(words: list) -> dict:
    return {word: len(word) for word in words}

# Test
assert create_word_lengths(["apple", "cat", "dog"]) == {"apple": 5, "cat": 3, "dog": 3}
assert create_word_lengths(["a"]) == {"a": 1}
print("✅ Exercise 4 passed")