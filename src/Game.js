import React, {useState} from "react";
import { Board } from "./Board";

export function Game(props) {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [isXNext, setIsXNext] = useState(true);
  const [step, setStep] = useState(0);

  function onClick(i) {
    const next = history.slice(0, step+1);
    const nextSquares = next[next.length-1].squares.slice();
    nextSquares[i] = isXNext ? "X" : "O";
    setHistory(next.concat([{squares: nextSquares}]));
    setStep(next.length);
    setIsXNext((x) => !x);
  }

  function jump(i) {
    setStep(i);
    setIsXNext(i%2==0);
  }

  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
  }

  let moves = history.map((squares, index) => {
    let desc = "Go to move #" + index;
    return (
        <li key={index}>
          <button onClick={() => jump(index)}>{desc}</button>
        </li>
    );
  });
  let winner = calculateWinner(history[step].squares);
  let status = winner
      ? "Winner: " + winner
      : "Next player: " + (isXNext ? "X" : "O");

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board squares={history[step].squares} onClick={onClick}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
