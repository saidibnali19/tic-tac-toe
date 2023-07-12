import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Square from "./Square";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 7],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) status = "Winner: " + winner;
  else status = "Next player: " + (xIsNext ? "X" : "O");

  let squaresArray = Array(9);

  for (let i = 0; i < 9; i++) {
    squaresArray[i] = i;
  }

  const boardSquares = squaresArray.map((item) => (
    <Square key={uuidv4()} value={squares[item]} onSquareClick={() => handleClick(item)} />
  ));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-grid">{boardSquares}</div>
    </>
  );
}
