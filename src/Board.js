import React, {useState} from "react";
import {Square} from "./Square";

export function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))

    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const status = calculateStatus(winner, squares, nextValue)

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

    function selectSquare(square) {
        if (winner || squares[square]) {
            return
        }
        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue
        setSquares(squaresCopy)
    }

    function renderSquare(i) {
        return (
            <Square val={squares[i]} onClick={() => selectSquare(i)}/>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </>
    );
}
