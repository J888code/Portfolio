def filter_evens(numbers: list) -> list:
    return [num for num in numbers if num % 2 == 0]

# Test
assert filter_evens([1, 2, 3, 4, 5, 6]) == [2, 4, 6]
assert filter_evens([1, 3, 5]) == []
print("✅ Exercise 2 passed")