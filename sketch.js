var visited = [];
var frontier = [];
var t = 0;
var cells = [];
var cols, rows;
var w = 60;
var remaining = (600/w * 600/w)-1;
var hunt = 0;
var grid = [];
var current;
var dropdown;
var stack = [];


function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);
  

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  
  let myDiv = createDiv().addClass("buttons");
  let btn1 = createButton('Recursive Backtracking').parent(myDiv);
  let btn2 = createButton('Binary Tree algorithm').parent(myDiv);
  let btn3 = createButton('Aldous-Broder algorithm').parent(myDiv);
    let btn4 = createButton('Hunt-and-Kill algorithm').parent(myDiv);
  let btn5 = createButton('Growing Tree algorithm').parent(myDiv);

  let btn6 = createButton('Clear').parent(myDiv);


  btn1.style('font-size', '15px');
  btn1.position(660, 750);
  btn1.style('background-color', '#4CAF50');
  btn1.style('padding: 5px 5px');
  btn1.style('margin-left: 10px');
  btn1.style('margin-right: 10px');

  btn2.style('font-size', '15px');
  btn2.position(860, 750);
  btn2.style('background-color', '#4CAF50');
  btn2.style('padding: 5px 5px');
  btn2.style('margin-left: 10px');
  btn2.style('margin-right: 10px');

  btn3.style('font-size', '15px');
  btn3.position(1060, 750);
  btn3.style('background-color', '#4CAF50');
  btn3.style('padding: 5px 5px');
  btn3.style('margin-left: 10px');
  btn3.style('margin-right: 10px');

  btn4.style('font-size', '15px');
  btn4.position(680, 800);
  btn4.style('background-color', '#4CAF50');
  btn4.style('padding: 5px 5px');
  btn4.style('margin-left: 10px');
  btn4.style('margin-right: 10px');
  
  btn5.style('font-size', '15px');
  btn5.position(880, 800);
  btn5.style('background-color', '#4CAF50');
  btn5.style('padding: 5px 5px');
  btn5.style('margin-left: 10px');
  btn5.style('margin-right: 10px');
  
  btn6.style('font-size', '15px');
  btn6.position(1100, 800);
  btn6.style('background-color', '#4CAF50');
  btn6.style('padding: 5px 5px');
  btn6.style('margin-left: 10px');
  btn6.style('margin-right: 10px');

  btn1.mousePressed(() => {
    for (let i = 0; i < 600; i++) {
      backtrack();
    }
  });

  // Turn it into 8-slide puzzle
  btn2.mousePressed(() => {
    binarytree();
  });

  // Turn it into 24-slide puzzle
  btn3.mousePressed(() => {
    for (let i = 0; i < 3000; i++) {
      aldousbroder();
    }
  });
  
  btn4.mousePressed(() => {
    for (let i = 0; i < 1000; i++) {
      huntandkill();
    }
  });
  
    btn5.mousePressed(() => {
    for (let i = 0; i < 1000; i++) {
      cells.push(current);
      growingtree();
    }
  });
  
  btn6.mousePressed(() => {
    grid.length = 0;
    t = 0;
    remaining = (600/w * 600/w)-1;
    cells = [];
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var cell = new Cell(i, j);
        grid.push(cell);
      }
    }
    for (var k = 0; k < grid.length; k++) {
      grid[k].visited = false;
      //grid[k].walls = [true, true, true, true];
    }
    current = grid[0];
  });
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  // To see the step, uncomment each of these functions
  
  // For Recursive Backtracking
  // backtrack();
  
  // For Binary Tree algorithm
  // binarytree();
  
  // For Aldous-Brother
  //aldousbroder();
  
  // For Growing Tree
  // cells.push(current);
  //  growingtree();
  
  // For Hunt-and-Kill
  //huntandkill();
  
}

// Recursive backtracking
function backtrack() {
  current.visited = true;
  current.highlight();
  // Find a random neighbor and visit
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // Push current cell
    stack.push(current);

    // Removel walls between current cell and neighbour
    removeWalls(current, next);

    // Continue
    current = next;
    // Backtrack
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

// Binary tree
function binarytree() {
  // Keep track of cells
  while (t < grid.length) {
    grid[t].visited = true;
    // From each cell, carve north or east
    var next = grid[t].checkNeighborsBinary();
    if (next) {
      next.visited = true;

      removeWalls(grid[t], next);
    }
    t++;

  }
}

// Aldous-Brother
function aldousbroder() {
  current.visited = true;
  current.highlight();

  var next = current.checkNeighborsAldous();
  // Keep track of unvisited cells
  if (remaining > 0) {
    // If neigbour is not visited, remove walls
    if (next.visited === false) {
      next.visited = true;
      remaining--;
      removeWalls(current, next);
      current = next;
      // If neigbour is visited, move to the next one
    } else if (next.visited === true) {
      current = next;
    }
  }
}

// Growing tree
function growingtree() {
  if (!current) {
    noLoop();
  }
  else {
    current.visited = true;
    current.highlight();
    // Check if cells still have cells in it
    if (cells.length > 0) {
      var next = current.checkNeighbors();
      if (next) {
        next.visited = true;

        // Push curent cell to cells
        cells.push(current);

        removeWalls(current, next);

        current = next;
        // If a cell has no unvisited neighbor left, remove it from cells
      } else if (!next) {
          removeFromArray(cells, current)

          var r = floor(random(0, cells.length));
          current = cells[r];
        }   
    }
  }
  
}

// Hunt and kill 
function huntandkill() {
  current.visited = true;
  current.highlight();
  // Kill mode
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    removeWalls(current, next);

    current = next;

  } 
  else {
    // Hunt mode, search in the grid for unvisited cell with visited neightbours, start from there
    for (let i = 0; i < grid.length; i++) {
      if(grid[i].visited === false && grid[i].checkVisitedNeighbors() === true) {
        print(grid[i].checkVisitedNeighbors())
        current = grid[i];
        // var next1 = current.getVisitedNeighbors();
        // removeWalls(current, next1);
        //huntandkill();
      }
    }
  }
  
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

  
function removeFromArray(arr, elt) {
  // Fine item, splice it
  for (var k = arr.length - 1; k >= 0; k--) {
    if (arr[k] == elt) {
      arr.splice(k, 1);
    }
  }
}


function removeWalls(a, b) {
  // Find which wall to remove 
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}


