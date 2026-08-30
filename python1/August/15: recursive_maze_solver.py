class Maze:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = None
    def generate_maze(self):
        self.grid = [
            [1, 1, 0, 1, 1],
            [0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ]
    def solve(self, start, end):
        visited = set()
        path = self.dfs(start, end, visited, [start])
        return path
    def dfs(self, current, end, visited, path):
        if current == end:
            return path
        visited.add(current)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        for dr, dc in directions:
            next_row = current[0] + dr
            next_col = current[1] + dc
            next_pos = (next_row, next_col)
            if (0 <= next_row < self.height and 0 <= next_col < self.width and next_pos not in visited and self.grid[next_row][next_col] == 1):
                new_path = path + [next_pos]
                result = self.dfs(next_pos, end, visited, new_path)
                if result is not None:
                    return result
        return None
    def display(self, start, end, path):
        for row in range(self.height):
            for col in range(self.width):
                current_pos = (row, col)
                if current_pos == start:
                    print('s', end=' ')
                elif current_pos == end:
                    print('e', end=' ')
                elif path and current_pos in path:
                    print('.', end=' ')
                elif self.grid[row][col] == 0:
                    print('x', end=' ')
                else:
                    print(' ', end=' ')
            print()
def main():
    maze = Maze(5, 5)
    print('=== Maze Solver ===')
    while True:
        print('\n1. Generate Maze\n2. Solve Maze\n3. Display Maze\n4. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input')
            continue
        if choice == 4:
            print('Bye')
            return
        if choice not in [1, 2, 3]:
            print('Invalid. input')
            continue
        if choice == 1:
            maze.generate_maze()
            print(f"Maze generated ({maze.width}x{maze.height})!")
        if choice == 2:
            start = tuple(map(int, input('Start (row, col): ').split(',')))
            end = tuple(map(int, input('End (row, col): ').split(',')))
            path = maze.solve(start, end)
            if path:
                print(f'Path found! Length: {len(path)} steps')
            else:
                print('No path found.')
        if choice == 3:
            print('=== Maze ===')
            start = tuple(map(int, input('Start (row, col): ').split(',')))
            end = tuple(map(int, input('End (row, col): ').split(',')))
            path = maze.solve(start, end)
            maze.display(start, end, path)
main()