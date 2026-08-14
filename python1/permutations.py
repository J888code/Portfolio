def generate_permutations(nums):
    results = []
    def backtrack(current_perm, remaining):
        if not remaining:
            results.append(current_perm[:])
        for num in remaining:
            current_perm.append(num)
            new_remaining = [x for x in remaining if x != num]
            backtrack(current_perm, new_remaining)
            current_perm.pop()
    backtrack([], nums)
    return results
print(generate_permutations([1, 2, 3]))