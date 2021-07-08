import React, { useEffect, useState } from "react";

export default function RockPaperScissors({ experienceUp, level }) {
  const [playerGuess, setPlayerGuess] = useState(null);
  const [playerImage, setPlayerImage] = useState();
  const [computerGuess, setComputerGuess] = useState(null);
  const [computerImage, setComputerImage] = useState();
  const [result, setResult] = useState(null);

  let options = ["rock", "paper", "scissors"];

  useEffect(() => {
    if (playerGuess) {
      setComputerGuess(options[Math.floor(Math.random() * 3)]);
    }
  }, [playerGuess]);

  return (
    <div>
      CoinFlip
      <h1 className="text-center">Rock Paper Scissors</h1>
      {/* Game Board */}
      <div className="game-board margin-center flex space-between border">
        <div className="rps-player">
          {result && <div>You chose {playerGuess}
          <div className="choice"></div></div>}
        </div>
        <button
          onClick={() => {
            if (!result) {
              if (playerGuess === computerGuess) {
                setResult("draw");
              } else if (
                (playerGuess === "rock" && computerGuess === "scissors") ||
                (playerGuess === "scissors" && computerGuess === "paper") ||
                (playerGuess === "paper" && computerGuess === "rock")
              ) {
                setResult("win");
                if (level < 2) {
                  experienceUp(10);
                }
              } else {
                setResult("loss");
              }
            }
          }}
        >
          Shoot
        </button>
        <div className="rps-computer">
          {result && <div>Computer chose {computerGuess}
          <div className="choice"></div></div>}
        </div>
      </div>
      <div>{result}</div>
      {/* Player Choices */}
      <div className="margin-center flex game-options">
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("rock");
            setResult(null);
          }}
        >
          Rock
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("paper");
            setResult(null);
          }}
        >
          Paper
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            setPlayerGuess("scissors");
            setResult(null);
          }}
        >
          Scissors
        </button>
      </div>
    </div>
  );
}
