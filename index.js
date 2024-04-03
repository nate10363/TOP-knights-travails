/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
function printBoard(size = 8) {
  const board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }

  function getBoardVal(x, y) {
    return board[x][y];
  }

  function setBoardVal(x, y, pos) {
    return board[x][y] = pos;
  }

  return { board, getBoardVal, setBoardVal };
}

const board = printBoard();

class Knight {
  constructor(start, end, path = []) {
    this.start = start;
    this.end = end;
    this.path = path;
  }

  knightMoves(queue = [this.start]) {
    board.setBoardVal(this.start[0], this.start[1], 'start');

    // Set the value of each board square that is found via this.findPossibleMoves()
    //   to the value of the square from which the knight arrived
    //   ex.) if knight jumps from (2,2) to (3,4), board.getBoardValue(3,4) = (2,2)
    while (queue.length > 0) {
      const curr = queue.shift();
      const possibleMoves = this.findPossibleMoves(curr[0], curr[1]);
      possibleMoves.forEach((move) => {
        board.setBoardVal(move[0], move[1], curr);
        queue.push(move);
      });

      // if board position is end, then create an array tracing back from end to start
      if (board.getBoardVal(this.end[0], this.end[1]) != 0) {
        const pathQueue = [this.end];
        const path = [];
        let pathStr = '';

        while (pathQueue.length > 0) {
          const pathItem = pathQueue.shift();
          if (pathItem == this.start) {
            path.unshift(pathItem);
            pathStr = `    [${pathItem}]
            
        ${pathStr}`;
            console.log(`> knightMoves(${this.start}, ${this.end})
            
=> You made it in ${path.length} moves!  Here's your path:

    ${pathStr}`);
            return;
          }
          pathQueue.push(board.getBoardVal(pathItem[0], pathItem[1]));
          path.unshift(pathItem);
          pathStr = `[${pathItem}]
        
        ${pathStr}`;
        }
      }
    }
  }

  findPossibleMoves(x, y) {
    const moves = [
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x + 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x - 1, y - 2],
    ];

    return moves.filter((move) => move[0] >= 0
                                && move[1] >= 0
                                && move[0] <= 7
                                && move[1] <= 7
                                && board.getBoardVal(move[0], move[1]) == 0);
  }

  checkStartEnd(start = this.start, end = this.end) {
    if (start[0] < 0 || start[1] < 0
        || start[0] > 7 || start[1] > 7) {
      return console.log('Please enter a valid starting position');
    }

    if (end[0] < 0 || end[1] < 0
        || end[0] > 7 || end[1] > 7) {
      return console.log('Please enter a valid ending position');
    }
  }
}

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  console.log(board.board);
});

const knight = new Knight([0, 0], [7, 7]);
knight.knightMoves();
