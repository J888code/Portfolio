Project 14: Mini Social Network

Objective: Build a social network with User class, friend connections, and posts.

Classes:

User:

__init__(username, email)
add_friend(user) — add to friends list
remove_friend(user) — remove from friends
post(content) — create a post
view_posts() — show all user's posts
view_feed() — show posts from friends

Post:

__init__(author, content, timestamp)
like() — increment likes
comment(user, text) — add comment

SocialNetwork:

__init__()
create_user(username, email)
find_user(username)
get_all_users()

User Stories:

Create users
Add/remove friends
Post content
View personal posts
View friends' posts (feed)
Like/comment on posts
Search for users

Example:

=== Social Network ===
1. Create User
2. Add Friend
3. Post
4. View Feed
5. View User
6. Quit

Choose: 1
Username: Alice
Email: alice@email.com
User created!

Choose: 1
Username: Bob
Email: bob@email.com
User created!

Choose: 2
Your username: Alice
Friend username: Bob
Bob added as friend!

Choose: 3
Username: Bob
Post content: Hello world!
Posted!

Choose: 4
Username: Alice
=== Alice's Feed ===
Bob: Hello world! (0 likes)

Build it. Focus on user relationships and data structure.