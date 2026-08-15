import json
def to_do_list():
    print('=== To-Do List ===')
    tasks = []
    def load_tasks():
        try:
            with open('tasks.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    def save_tasks():
        with open('tasks.json', 'w') as f:
            json.dump(tasks, f)
    tasks = load_tasks()
    while True:
        print('1. Add Task\n2. View All Tasks\n3. Mark Task Complete\n4. Delete Task\n5. Quit')
        try:
            choice = int(input('Choose option: '))
        except ValueError:
            print('Invalid input.')
        if choice == 5:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3, 4]:
            print('Invalid choice. Try again.')
            continue

        if choice == 1:
            title = input('Enter title: ')
            description = input('Enter description: ')
            task = {'title': title, 'description': description, 'complete': False}
            tasks.append(task)
            save_tasks()
            print('Tasks added!')
        if choice == 2:
            for index, task in enumerate(tasks, 1):
                if task['complete']:
                    checkbox = "[/]"
                else:
                    checkbox = "[x]"
                print(f"{index}. {checkbox} {task['title']}\nDescription: {task['description']}")
        if choice == 3:
            try:
                num = int(input('Enter task number to mark complete: ')) - 1
            except ValueError:
                print('Invalid input')
            if 0 <= num < len(tasks):
                tasks[num]['complete'] = True
                print(f'Task {num + 1} marked complete!')
                save_tasks()
            else:
                print('Invalid task number.')
        if choice == 4:
            try:
                num = int(input('Enter task number to delete: ')) - 1
            except ValueError:
                print('Invalid input')
            if 0 <= num < len(tasks):
                tasks.pop(num)
                save_tasks()
            else:
                print('Invalid task number.')
to_do_list()