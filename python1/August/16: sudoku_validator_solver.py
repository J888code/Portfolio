class Sudoku:
    def __init__(self):
        self.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
    def is_valid(self, row, col, num):
        for c in range(9):
            if self.grid[row][c] == num:
                return False
        for r in range(9):
            if self.grid[r][col] == num:
                return False
        box_row = (row // 3) * 3
        box_col = (col // 3) * 3

        for r in range(box_row, box_row + 3):
            for c in range(box_col, box_col + 3):
                if self.grid[r][c] == num:
                    return False
        return True
    
    def solve(self):
        for row in range(9):
            for col in range(9):
                if self.grid[row][col] == 0:
                    for num in range(1, 10):
                        if self.is_valid(row, col, num):
                            self.grid[row][col] = num
                            if self.solve():
                                return True
                            self.grid[row][col] = 0
                    return False
        return True
    def display(self):
        for row in range(9):
            for col in range(9):
                print(self.grid[row][col], end=' ')
            print()
def main():
    sudoku = Sudoku()
    print('=== Sudoku Solver ===')
    while True:
        print('\n1. Enter Puzzle\n2. Solve\n3. Display\n4. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input')
            continue
        if choice == 4:
            print('Bye')
            return
        if choice not in [1, 2, 3]:
            print('Invalid input')
            continue
        if choice == 1:
            for row in range(9):
                line = input(f'Row {row + 1}: ')
                values = line.split(',')
                for col, val in enumerate(values):
                    sudoku.grid[row][col] = int(val)
            print('Puzzle entered!')
        if choice == 2:
            print('Solving...')
            sudoku.solve()
            print('Solved!')
        if choice == 3:
            sudoku.display()
main()