import React, { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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

  // Determine the winner function
  function getWinner(square) {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  // Handle square click function
  function handleSquareClick(index) {
    if (board[index] || getWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "❌" : "⭕";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = getWinner(newBoard);
    if (winner || newBoard.every((s) => s !== null)) {
      setShowPopup(true);
    }
  }

  // Reset the game state function
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowPopup(false);
  }

  // Determine game status message function
  function getGameStatus() {
    const winner = getWinner(board);
    if (winner) return `Winner: ${winner}`;
    if (board.every((s) => s !== null)) return "It's a Draw!";
    return `Next Player: ${isXNext ? "❌" : "⭕"}`;
  }

  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center relative">
      <div className="w-full max-w-[400px] mx-5 my-5">
        <h1 className="text-white text-3xl font-bold md:text-4xl text-center">
          Welcome to Tic Tac Toe
        </h1>

        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold animate-bounce text-green-300"
              : "text-xl text-white"
          }`}
        >
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              className="h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 text-white"
              onClick={() => handleSquareClick(index)}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          className="w-full py-3 text-lg text-white border border-white rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>

      {/* Transparent Glass Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/20 backdrop-blur-lg border border-white/40 shadow-xl w-full max-w-sm rounded-xl p-6 text-center animate-fade">
            <h2 className="text-2xl font-bold text-white mb-4">
              {getWinner(board)
                ? `🎉 Winner: ${getWinner(board)}`
                : "🤝 It's a Draw!"}
            </h2>

            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-5 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-700/80"
                onClick={resetGame}
              >
                Play Again
              </button>

              <button
                className="px-5 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/80"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
