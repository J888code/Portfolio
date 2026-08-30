class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.friends = []
        self.posts = []
    def add_friend(self, user):
        self.friends.append(user)
    def remove_friend(self, user):
        self.friends.remove(user)
    def post(self, content):
        from datetime import datetime
        post = Post(self.username, content, datetime.now())
        self.posts.append(post)
    def view_posts(self):
        pass
    def view_feed(self):
        pass
class Post:
    def __init__(self, author, content, timestamp):
        self.author = author
        self.content = content
        self.timestamp = timestamp
        self.likes = 0
        self.comments = []
    def like(self):
        self.likes += 1
    def comment(self, user, text):
        pass
class SocialNetwork:
    def __init__(self):
        self.users = []
    def create_user(self, username, email):
        user = User(username, email)
        self.users.append(user)
    def find_user(self, username):
        for user in self.users:
            if user.username == username:
                return user
        return None
    def get_all_users(self):
        pass

def main():
    network = SocialNetwork()
    print('=== Social Network ===')
    while True:
        print('1. Create User\n2. Add Friend\n3. Post\n4. View Feed\n5. View User\n6. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input.')
            continue
        if choice == 6:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3, 4, 5]:
            print('Invalid input.')
            continue
        if choice == 1:
            username = input('Username: ')
            email = input('Email: ')
            if '@' not in email:
                print('Invalid email.')
                continue
            else:
                network.create_user(username, email)
                print('User created!')
        if choice == 2:
            you = input('Your username: ')
            for username in network.users:
                if you == username.username:
                    friend = input('Friend username: ')
                    for username in network.users:
                        if friend == username.username:
                            friend_acc = username
                            username.friends.append(friend_acc)
                    print(f'{friend} added as friend!')
        if choice == 3:
            name = input('Username: ')
            for username in network.users:
                if name == username.username:
                    post = input('Post content: ')
                    username.post(post)
                    print('Posted!')
        if choice == 4:
            name = input('Username: ')
            if network.find_user(name):
                user = network.find_user(name)
                print(f"=== {name}'s Feed ===")
                for post in user.posts:
                    print(f"{post.author}: {post.content} ({post.likes} likes)")
        if choice == 5:
            name = input('Username: ')
            if network.find_user(name):
                user = network.find_user(name)
                print(f"{name} - Email: {user.email}")
main()