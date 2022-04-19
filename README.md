# Maze Generator (5 algorithms)

Visit the browser version here: https://nguyen-viet-an.github.io/MazeGenerator5Algorithms/

# Description

A maze generator that generates maze using 5 different algorithms.
Maze generation algorithms are automated methods for the creation of mazes.

The 5 algorithms implemented are: Recursive Backtracking, Binary Tree, Aldous-Broder, Hunt-and-Kill and Growing Tree. The mechanism of each algorithm are described below.

1. Recursive Backtracking
- Choose a starting point in the field, which I chose the first cell of the grid.
- Randomly choose a wall at that point and carve a passage through to the adjacent cell, but only if the adjacent cell has not been visited yet. This becomes the new current cell.
- If all adjacent cells have been visited, back up to the last cell that has uncarved walls and repeat.
- The algorithm ends when the process has backed all the way up to the starting point.

2. Binary Tree (the easiest!)
- For every cell in the grid, randomly carve a passage either north (top), or east (right).

3. Aldous-Broder
- Choose a cell, again, I chose the first cell of the grid.
- Choose a random neighbour of that cell and if it's not been visited, visit it (remove the wall between the two) and make it the current cell. If it's visited, don't remove wall and make it the current cell.
- Repeat step 2 until all cells have been visited.

4. Hunt-and-Kill
- Choose a starting location.
- Perform a random walk, carving passages to unvisited neighbors, until the current cell has no unvisited neighbors.
- Enter “hunt” mode, where the generator scan the grid looking for an unvisited cell that is adjacent to a visited cell. If found, carve a passage between the two and let the formerly unvisited cell be the new starting location.
- Repeat steps 2 and 3 until the hunt mode scans the entire grid and finds no unvisited cells.

5. Growing Tree
- Create a list of cells called cells, initially empty. Add one cell to the list, at random (I chose the first cell of the grid).
- Choose a cell from cells, and carve a passage to any unvisited neighbor of that cell, adding that neighbor to C as well. If there are no unvisited neighbors, remove the cell from cells.
- Repeat step 2 until C is empty.

# Features:
- 'Recursive Backtracking' button: to generate maze using recursive backtracking
- 'Binary Tree' button: to generate maze using Binary Tree algorithm
- 'Aldous-Broder' button: to generate maze using Aldous-Broder algorithm
- 'Hunt-and-Kill' button: to generate maze using Hunt-and-Kill algorithm
- 'Growing Tree' button: to generate maze using Growing Tree algorithm
- 'Clear' button: to reset the grid, after using an algorithm, you can press clear to reset the grid and use a different one.

# Screenshots
The interface of the generator:

![image](https://user-images.githubusercontent.com/68835511/163913377-49829bce-8d42-4a3b-804b-6e16f26ce7da.png)

After using recursive backtracking (see the code to see how the maze can be generated step-by-step, the browser version will only show the result maze):

![image](https://user-images.githubusercontent.com/68835511/163913449-abfd4b6b-d35e-4381-842e-9665d983f29a.png)



