import React, { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  function getWinner(square) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  function handlesquareClick(index) {
    if (board[index] || getWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function getGameStatus() {
    const winner = getWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square !== null)) {
      return "It's a Draw!";
    } else {
      return `Next Player: ${isXNext ? "X" : "O"}`;
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center">
      <div>
        <h1 className="text-white text-4xl font-bold">
          Welcome to Tic Tac Toe
        </h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold animate-bounce text-green-500"
              : "text-xl text-white"
          }`}
        >
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              className={`h32 w-full`}
              onClick={() => handlesquareClick(index)}
            >
              {square}
            </button>
          ))}
        </div>

        <button className="w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200">
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
