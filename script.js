/*
Future Improvements
ADD AI:
  EASY: Random moves
  Medium: Alpha Beta Pruning
  Hard: Custom Moves with a single way to win
  Impossible: MinMax Algorithm
*/

function Gameboard() {
    const board = [];
    for(let i=0; i < 9; i++) {
      board.push(Cell());    
    }

    const getBoard = () => board;

    const play = (symbol, index) => {
      if (index >= 0 && index < 9)
        board[index].setSymbol(symbol);
    }

    const resetBoard = () => {
      board.map(cell => cell.reset());
    }

    const printBoard = () => {
        return board.map(cell => cell.getValue());
    };

    /*
    board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]
    */
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

    const checkWinner = () => {
      const temp = board.map(cell => cell.getValue());
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (temp[a] && temp[a] === temp[b] && temp[a] === temp[c]) {
          return temp[a]; // Return the winning player's symbol
        }
      }
      if(boardFull()) return "tie";
      return "none";
    };

    const boardFull = () => {
      let status = true;
      board.forEach(cell => {
        if(!cell.getValue() && status)
          status = false;
      });
      return status;
    }

    const validate = (index) => {
      if(index >= 0 && index < 9)
        return board[index].getValue() ? false : true; 
      // if empty then return true (means cell is available for use) and vice versa
      return false;
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
  let winner = "";

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
  };

  const valid = (cell) => {
    return board.validate(cell);
  }

  const gameOver = () => {
    let gameState = board.checkWinner();
    if (gameState === "none") {
      winner = "";
      return false;
    }
    else {
      if (gameState === "tie") winner = "Tie";
      else if (gameState === "X") winner = "X";
      else if (gameState === "O") winner = "O";
      restartGame();
      return true;
    }
  }

  const playRound = (cell) => {
    if(valid(cell)) {
      const token = getActivePlayer().token;
      board.play(token, cell);
      switchPlayerTurn();
      printNewRound();
      return board.printBoard();
    }
  };
  
  const restartGame = () => {
    board.resetBoard();
  }

  const getWinner = () => {return winner};

  return {
    playRound,
    getActivePlayer,
    restartGame,
    getWinner,
    gameOver
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

// playerOne.setName("Zain");
// playerOne.setToken("X");
// playerTwo.setName("Mataiba");
// playerTwo.setToken("O");

function setTheme() {
    let root = document.documentElement;
    root.className = ((root.className === "dark") ? "light" : "dark");
}
document.querySelector(".theme").addEventListener("click", setTheme);

let cells = document.querySelectorAll(".cell");
const display = Display();
cells.forEach(cell => {
  cell.addEventListener("click", (e) => {
    let result = game.playRound(e.target.id);
    display.updateDisplay(result);
  });
});

let restart_btn = document.querySelector(".restart");
restart_btn.addEventListener("click", () => {
  game.restartGame();
  display.restartDisplay();

});

function Display() {
  let playerName = document.querySelector(".player-name");
  let playerSymbol = document.querySelector(".player-symbol");
  let result = document.querySelector(".result");

  let updateDisplay = (result) => {
    resetStyles();
    cells.forEach((cell, index) => {
      cell.textContent = result[index];
    });
    updateHeader();
    if(game.gameOver())
      updateWinner();
  }

  let restartDisplay = () => {
    cells.forEach((cell, index) => {
      cell.textContent = "";
    })
    resetStyles();
  }

  let updateHeader = () => {
    playerName.textContent = game.getActivePlayer().name;
    playerSymbol.textContent = game.getActivePlayer().token;
  }

  let updateWinner = () => {
    result.textContent = `Winner is: ${game.getWinner()}`;
    result.classList.add("winner");
  }

  let resetStyles = () => {
    result.textContent = "";
    result.classList.remove("winner");
  }

  return {updateDisplay, restartDisplay};
}
