def square_numbers(numbers: list) -> list:
    return [num**2 for num in numbers]

# Test
assert square_numbers([1, 2, 3, 4, 5]) == [1, 4, 9, 16, 25]
assert square_numbers([0, -1, -2]) == [0, 1, 4]
print("✅ Exercise 1 passed")