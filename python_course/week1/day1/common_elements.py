def find_common_interests(person1_interests: list, person2_interests: list) -> list:
    """
    Find hobbies that both people share.
    
    Input: ["coding", "gaming", "music"], ["coding", "sports", "music"]
    Output: ["coding", "music"] or ["music", "coding"] (order doesn't matter)
    
    HINT: Convert to sets, use intersection, convert back
    """
    set1 = set(person1_interests)
    set2 = set(person2_interests)
    return list(set1 & set2)

# Test
common = find_common_interests(
    ["coding", "gaming", "music"],
    ["coding", "sports", "music"]
)
assert set(common) == {"coding", "music"}
print("✅ Exercise 3 passed")