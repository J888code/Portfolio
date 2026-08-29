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
        pass
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
        pass
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
                if you == username:
                    friend = input('Friend username: ')
                    username.friends.append(friend)
                    print(f'{friend} added as friend!')
main()