import React, { useState } from "react";
import xToken from "./x.png";
import oToken from "./o.png";

export default function TicTacToe() {
  const [playerToken, setPlayerToken] = useState("");

  return (
    <div>
      <h1 className="text-center">Tic Tac Toe</h1>

      {!playerToken && (
        <div className="text-center">
          {" "}
          <h3>Pick One:</h3>
          <div className="flex space-evenly margin-center">
            <img
              onClick={() => {
                setPlayerToken("x");
              }}
              className="ttt-token"
              src={xToken}
              alt="X token"
            />
            <div></div>
            <img
              onClick={() => {
                setPlayerToken("o");
              }}
              className="ttt-token"
              src={oToken}
              alt="O Token"
            />
          </div>
        </div>
      )}

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
