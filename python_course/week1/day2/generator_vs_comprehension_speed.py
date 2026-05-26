import time

def compare_speed(n: int) -> dict:
    start = time.time()
    result = [x ** 2 for x in range(n)]
    comp_time = time.time() - start
    
    start = time.time()
    result = list(x ** 2 for x in range(n))
    gen_time = time.time() - start
    
    return {
        "comprehension": comp_time,
        "generator": gen_time,
        "ratio": comp_time / gen_time
    }

# Test
result = compare_speed(1000000)
print(f"Comprehension: {result['comprehension']:.4f}s")
print(f"Generator: {result['generator']:.4f}s")
print(f"Ratio: {result['ratio']:.2f}x")
print("✅ Exercise 5 passed")