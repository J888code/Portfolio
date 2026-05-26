def create_lookup_cache(names: list) -> dict:
    """
    Create a cache where you can instantly check if a name exists.
    
    Should return a dict mapping names to True.
    This allows O(1) lookups instead of O(n) searches.
    
    Input: ["alice", "bob", "carol"]
    Output: {"alice": True, "bob": True, "carol": True}
    
    HINT: Dict with names as keys
    """
    d = {name: True for name in names}
    return d
# Test
cache = create_lookup_cache(["alice", "bob", "carol"])
assert "alice" in cache  # O(1) lookup!
assert "david" not in cache
print("✅ Exercise 2 passed")