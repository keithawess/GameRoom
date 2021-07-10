import React, { useState } from "react";

export default function TicTacToe() {
  const [playerToken, setPlayerToken] = useState("");

  return (
    <div>
      <h1 className="text-center">Tic Tac Toe</h1>

      {!playerToken && 
      <div className="margin-center">
        <img />
        <div>

          </div>
        <img />
      </div>}

      {playerToken && (
        <div className="game-board margin-center flex border wrap">
          <div className="ttt-spot border-right border-bottom"></div>
          <div className="ttt-spot border-left border-right border-bottom"></div>
          <div className="ttt-spot border-left border-bottom"></div>
          <div className="ttt-spot border-right border-top border-bottom"></div>
          <div className="ttt-spot border"></div>
          <div className="ttt-spot border-top border-bottom border-left"></div>
          <div className="ttt-spot border-top border-right"></div>
          <div className="ttt-spot border-left border-top border-right"></div>
          <div className="ttt-spot border-left border-top"></div>
        </div>
      )}
    </div>
  );
}
