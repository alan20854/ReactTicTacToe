import React from "react";

export function Square({val, onClick}) {
    return (
        <button className="square" onClick={() => onClick()}>
            {val}
        </button>
    );
};