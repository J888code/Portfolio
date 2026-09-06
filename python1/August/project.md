Project 16: Sudoku Validator + Solver

Objective: Validate a Sudoku puzzle, then solve it using backtracking.

Classes:

Sudoku:

__init__(grid) — 9x9 2D list (0 = empty)
is_valid(row, col, num) — check if placing num at (row, col) is valid
Check row doesn't have num
Check column doesn't have num
Check 3x3 box doesn't have num
solve() — use backtracking to fill empty cells
display() — print the solved puzzle

Backtracking Logic:

Find empty cell (value = 0)
Try numbers 1-9
If valid, place it and recursively solve
If solved, return True
If stuck, backtrack (undo) and try next number

Example:

=== Sudoku Solver ===
1. Enter Puzzle
2. Solve
3. Display
4. Quit

Choose: 1
Enter 9 rows (comma-separated, 0 for empty):
5,3,0,0,7,0,0,0,0
6,0,0,1,9,5,0,0,0
0,9,8,0,0,0,0,6,0
8,0,0,0,6,0,0,0,3
4,0,0,8,0,3,0,0,1
7,0,0,0,2,0,0,0,6
0,6,0,0,0,0,2,8,0
0,0,0,4,1,9,0,0,5
0,0,0,0,8,0,0,7,9

Puzzle entered!

Choose: 2
Solving...
Solved!

Choose: 3
5 3 4 | 6 7 8 | 9 1 2
6 7 2 | 1 9 5 | 3 4 8
1 9 8 | 3 4 2 | 5 6 7
------+-------+------
8 5 9 | 7 6 1 | 4 2 3
4 2 6 | 8 5 3 | 7 9 1
7 1 3 | 9 2 4 | 8 5 6
------+-------+------
9 6 1 | 5 3 7 | 2 8 4
2 8 7 | 4 1 9 | 6 3 5
3 4 5 | 2 8 6 | 1 7 9

Choose: 4
Goodbye!