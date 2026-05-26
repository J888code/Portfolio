def build_user_lookup(users: list) -> dict:
    result = {}
    for user in users:
        user_id = user["id"]
        user_info = {
            "name": user["name"],
            "age": user["age"]
        }
        result[user_id] = user_info
    return result