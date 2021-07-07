import React from "react";

export default function RockPaperScissors() {
  return (
    <div>
      CoinFlip
      <h1 className="text-center">Rock Paper Scissors</h1>
      {/* Game Board */}
      <div className="game-board margin-center flex space-between border">
        <div className="rps-player">
            

        </div>

        <div className="rps-computer">

        </div>
      </div>
      <div className="margin-center flex justify-center game-options">
        <button className="margin-center option-button">Rock</button>
        <button className="margin-center option-button">Paper</button>
        <button className="margin-center option-button">Scissors</button>
      </div>
    </div>
  );
}
