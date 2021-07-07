import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function RockPaperScissors({ experienceUp, level }) {
  const [playerGuess, setPlayerGuess] = useState("rock");
  const [playerImage, setPlayerImage] = useState();
  const [computerGuess, setComputerGuess] = useState(null);
  const [computerImage, setComputerImage] = useState();
  const [result, setResult] = useState(null);

  return (
    <div>
      CoinFlip
      <h1 className="text-center">Rock Paper Scissors</h1>
      {/* Game Board */}
      <div className="game-board margin-center flex space-between border">
        <div className="rps-player">
          {playerGuess && <div>You chose {playerGuess}</div>}
        </div>

        <div className="rps-computer">
          {computerGuess && <div>Computer chose {computerGuess}</div>}
        </div>
      </div>
      {/* Player Choices */}
      <div className="margin-center flex game-options">
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("rock");
          }}
        >
          Rock
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("paper");
          }}
        >
          Paper
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("scissors");
          }}
        >
          Scissors
        </button>
      </div>
    </div>
  );
}
