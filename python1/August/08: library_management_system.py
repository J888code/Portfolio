class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = True  # All books start as available
class Member:
    def __init__(self, name, member_id):
        self.name = name
        self.member_id = member_id
        self.borrowed_books = []  # Empty list, they haven't borrowed anything yet
class Library:
    def __init__(self):
        self.books = []  # Empty list of books
        self.members = []  # Empty list of members
    def add_book(self, book):
        self.books.append(book)
    def add_member(self, member):
        self.members.append(member)
        print(f'Member added! (ID: {member.member_id})')
    def borrow_book(self, member_id, isbn):
        book = None
        for b in self.books:
            if b.isbn == isbn:
                book = b
                break
        member = None
        for m in self.members:
            if m.member_id == member_id:
                member = m
                break
        if book is None:
            print('Book not found.')
        elif member is None:
            print('Member not found.')
        elif not book.available:
            print('Book not available.')
        else:
            member.borrowed_books.append(book)
            book.available = False
            print('Book borrowed successfully!')
    def return_book(self, member_id, isbn):
        book = None
        for b in self.books:
            if b.isbn == isbn:
                book = b
                break
        member = None
        for m in self.members:
            if m.member_id == member_id:
                member = m
                break
        if book is None:
            print('Book not found.')
        elif member is None:
            print('Member not found.')
        else:
            if book not in member.borrowed_books:
                print('Member did not borrow this book.')
                member.borrowed_books.remove(book)
                book.available = True
                print('Book returned successfully!')
    def view_books(self):
        for book in self.books:
            if book.available:
                ready = 'AVAILABLE'
            else:
                ready = 'BORROWED'
            print(f"'{book.title}' by '{book.author}' ISBN: {book.isbn} [{ready}]")
    def view_members(self):
        for member in self.members:
            print(f"{member.name} (ID: {member.member_id})")
            if member.borrowed_books:
                for book in member.borrowed_books:
                    print(f" - {book.title}")
            else:
                print("No books borrowed")
def main():
    lib = Library() 
    print('=== Library Management ===')
    while True:
        print('1. Add Book\n2. Add Member\n3. Borrow Book\n4. Return Book\n5. View Books\n6. View Members\n7. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input')
        if choice == 7:
            print('Goodbye')
            return
        if choice not in [1, 2, 3, 4, 5, 6]:
            print('Invaid input. Please try again.')
            continue
        if choice == 1:
            title = input('Enter title: ')
            author = input('Enter author: ')
            try:
                isbn = int(input('Enter ISBN: '))
            except ValueError:
                print("Enter an integer")
            new_book = Book(title, author, isbn)
            lib.add_book(new_book)
            print('Book added!')
        if choice == 2:
            name = input('Enter name: ')
            member_id = len(lib.members) + 1
            new_member = Member(name, member_id)
            lib.add_member(new_member)
        if choice == 3:
            try:
                member_id = int(input('Enter member ID: '))
                isbn = int(input('Enter ISBN: '))
                lib.borrow_book(member_id, isbn)
            except ValueError:
                print('Invalid input')
                continue
        if choice == 4:
            try:
                member_id = int(input('Enter member ID: '))
                isbn = int(input('Enter ISBN: '))
                lib.return_book(member_id, isbn)
            except ValueError:
                print('Invalid input')
        if choice == 5:
            print('=== All Books ===')
            lib.view_books()
        if choice == 6:
            print('=== All Members')
            lib.view_members()
main()