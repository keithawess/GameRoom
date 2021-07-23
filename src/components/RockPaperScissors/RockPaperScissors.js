import React, { useContext, useEffect, useState } from "react";
import rock from "./images/rock.png";
import scissors from "./images/scissors.png";
import paper from "./images/paper.png";
import { UserContext } from "../../context";

export default function RockPaperScissors() {
  //State
  const [playerGuess, setPlayerGuess] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);
  const [computerGuess, setComputerGuess] = useState(null);
  const [computerImage, setComputerImage] = useState(null);
  const [result, setResult] = useState(null);

  const { experienceUp, level } = useContext(UserContext);

  //Array for computer guesses
  let options = ["rock", "paper", "scissors"];

  //Sets computer's image to correct image every time it changes.
  useEffect(() => {
    switch (computerGuess) {
      case "rock":
        setComputerImage(rock);
        break;
      case "paper":
        setComputerImage(paper);
        break;
      case "scissors":
        setComputerImage(scissors);
        break;
      default:
        break;
    }
  }, [computerGuess]);

  return (
    <div>
      <h1 className="text-center">Rock Paper Scissors</h1>

      {/* Game Board */}
      <div className="game-board margin-center flex space-evenly align-items-center">
        {/* Players Side */}
        <div className="rps-player text-center third">
          {result && (
            <div>
              <div>Player:</div>
              <img className="rps-img" src={playerImage} alt={playerGuess} />
            </div>
          )}
        </div>

        {/* Button to check guesses. Displays result after checks. */}
        <button
          className="rps-shoot text-white"
          onClick={() => {
            if (!result && playerGuess) {
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
          {/* Displays Shoot when game is reset */}
          {!result ? "Shoot" : result}
        </button>

        {/* Computer's Side */}
        <div className="rps-computer text-center third">
          {result && (
            <div>
              <div>Computer:</div>
              <img
                className="rps-img"
                src={computerImage}
                alt={computerGuess}
              />
            </div>
          )}
        </div>
      </div>

      {/* Buttons for Player Choices. Highlights blue when selected*/}
      <div className="margin-center flex game-options">
        <button
          className={`margin-center option-button ${
            playerGuess === "rock" && !result ? "bg-blue text-white" : ""
          }`}
          onClick={() => {
            setPlayerGuess("rock");
            setComputerGuess(options[Math.floor(Math.random() * 3)]);
            setPlayerImage(rock);
            setResult(null);
          }}
        >
          Rock
        </button>
        <button
          className={`margin-center option-button ${
            playerGuess === "paper" && !result ? "bg-blue text-white" : ""
          }`}
          onClick={() => {
            setPlayerGuess("paper");
            setComputerGuess(options[Math.floor(Math.random() * 3)]);
            setPlayerImage(paper);
            setResult(null);
          }}
        >
          Paper
        </button>
        <button
          className={`margin-center option-button ${
            playerGuess === "scissors" && !result ? "bg-blue text-white" : ""
          }`}
          onClick={() => {
            setPlayerGuess("scissors");
            setComputerGuess(options[Math.floor(Math.random() * 3)]);
            setPlayerImage(scissors);
            setResult(null);
          }}
        >
          Scissors
        </button>
      </div>
    </div>
  );
}
