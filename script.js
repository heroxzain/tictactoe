/*
Future Improvements
ADD AI:
  EASY: Random moves
  Medium: Alpha Beta Pruning
  Hard: Custom Moves with a single way to win
  Impossible: MinMax Algorithm

MOVE TO SINGLE ARRAY BOARD:
//
// * Checks the tic-tac-toe board for a winner.
// * @param {string[]} board The current state of the 3x3 board as a flat array.
// * @returns {string|null} The winning player's symbol ('X' or 'O'), or null if no winner.
//
function checkWinner(board) {
  // Define all 8 possible winning lines (rows, columns, diagonals)
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
  ];
  // Iterate over each winning combination
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    // Check if the board cells at the winning indices are all the same
    // and not empty (e.g., null, undefined, or empty string)
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning player's symbol
    }
  }
  return null; // No winner found
}
const gameBoard = ['X', 'O', 'X', 
                   'O', 'X', 'O', 
                   'X', 'O', 'X']; // Example board state (X wins diagonally)

const winner = checkWinner(gameBoard);
if (winner) {
  console.log(`Player ${winner} has won!`);
} else {
  // You can also check for a draw here
  const isDraw = gameBoard.every(cell => cell !== '');
  if (isDraw) {
    console.log("It's a draw!");
  } else {
    console.log("The game is still in progress.");
  }
}
*/

function Gameboard() {
    const board = [];
    for(let i=0; i < 3; i++) {
        board[i] = [];
        for(let j=0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const play = (symbol, row, column) => {
      if (row >= 0 && row < 3 && column >= 0 && column < 3)
        board[row][column].setSymbol(symbol);
      // if (boardFull()) resetBoard(); // not need yet, first implement winner function properly in the gameController
    }

    const resetBoard = () => {
        const emptyBoard = board.map((row) => row.map((cell) => cell.reset()));
        console.log(emptyBoard);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    const checkWinner = () => {
      const b = board.map(row => row.map(cell => cell.getValue()));
      for (let i = 0; i < 3; i++) {
        if (b[i][i] && (
          (b[i][0] === b[i][1] && b[i][1] === b[i][2]) || // Row Check
          (b[0][i] === b[1][i] && b[1][i] === b[2][i]) // Column Check
        )) return b[i][i]; 
      }
      // diagonals
      if (b[1][1] && (
        (b[0][0] === b[1][1] && b[1][1] === b[2][2]) ||
        (b[0][2] === b[1][1] && b[1][1] === b[2][0])
      )) return b[1][1];
      if(boardFull()) return "tie";
      return "none";
    };

    const boardFull = () => {
      let status = true;
      board.forEach((row) => row.forEach(cell => {
        if(!cell.getValue() && status)
          status = false;
      }));
      return status;
    }

    const validate = (row, column) => {
        return board[row][column].getValue() ? false : true; 
        // if empty then return true (means cell is available for use) and vice versa
    }

    return {getBoard, play, resetBoard, printBoard, checkWinner, validate};
}

function Cell() {
  let value = "";
  const getValue = () => value;
  const setSymbol = (symbol) => {
    if(value === "" && (symbol === "X" || symbol === "O")) 
      value = symbol;
  }
  const reset = () => value = "";
  return {getValue, setSymbol, reset};
}

function GameController(playerOne, playerTwo) {
  const board = Gameboard();

  const players = [
    {
      name: (playerOne.getName() ?? "Player One"),
      token: (playerOne.getToken() ?? "X")
    },
    {
      name: (playerTwo.getName() ?? "Player Two"),
      token: (playerTwo.getToken() ?? "O")
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn. (${getActivePlayer().token})`);
  };

  const valid = (cell) => {
    const row = indexes[cell].row;
    const column = indexes[cell].column;
    return board.validate(row, column);
  }

  const indexes = [null,];
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) 
      indexes.push({row: i, column: j});
  }

  const gameOver = () => {
    if (board.checkWinner() === "none") return;
    else restartGame();
    // update else condition to true the winner variable
    // can return true and false to update UI
  }

  const playRound = (cell) => {
    if (cell < 1 || cell > 9) return;
    console.log("Valid", valid(cell))
    if(valid(cell)) {
      const row = indexes[cell].row;
      const column = indexes[cell].column;
      const token = getActivePlayer().token;
      
      board.play(token, row, column);
      gameOver();
      switchPlayerTurn();
      printNewRound();
    }
  };
  
  const restartGame = () => {
    console.log("Winner: ", board.checkWinner());
    // can use winner boolean variable to update screen automatically if winner is finalized
    board.resetBoard();
  }

    // let gameState = board.checkWinner();
    // if (gameState === "tie") 
    // else if (gameState === "X")
    // else if (gameState === "O") 

  return {
    playRound,
    getActivePlayer,
    restartGame
  };
}

const players = () => {
  let name;
  let token;
  const setName = (n) => {
    name = n;
  }
  const setToken = (t) => {
    if (t === "X" || t === "O") token = t;
  }
  const getName = () => name;
  const getToken = () => token;
  return {setName, setToken, getName, getToken};
};

let playerOne = players();
let playerTwo = players();
const game = GameController(playerOne, playerTwo);

playerOne.setName("Zain");
playerOne.setToken("X");
playerTwo.setName("Mataiba");
playerTwo.setToken("O");

for(let i=0; i<9; i++) 
  game.playRound(i);

/*
Dom manipulation is simple: 
  Add div or button on 3x3 grid on click it 
  will take id and playRound(div.id)
  and update the UI regularly 
*/
