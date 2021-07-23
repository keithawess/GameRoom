import React, { useCallback, useEffect, useState } from "react";

export default function Mastermind() {
  //State
  const [guesses, setGuesses] = useState(0);
  const [playerGuesses, setPlayerGuesses] = useState([0, 0, 0, 0]);
  const [pastGuesses, setPastGuesses] = useState(
    Array(4).fill(Array(4).fill(0))
  );
  const [code, setCode] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [result, setResult] = useState(true);
  //Colors Options
  const colors = ["red", "yellow", "blue", "green", "purple", "orange"];

  const generateCode = useCallback(()=>{
    let temp = [];
    for(let i = 0; i < 4; i++)
    {
      temp[i] = Math.floor(Math.random() * 6);
    }
    console.log(temp);
    return temp;
  }, []);

  const startGame = useCallback(()=>{
    setGameRunning(true);
    setCode(generateCode());
  }, [])

  useEffect(() => {
    console.log(playerGuesses);
  }, [playerGuesses]);

  useEffect(() => {
    console.log(pastGuesses);
  }, [pastGuesses]);

  return (
    <div>
      <h1 className="text-center" onClick={()=>{
        if(gameRunning === false){
          startGame();
        }
      }}>Mastermind</h1>

      {/* Game Board */}
      <div className="game-board margin-center flex wrap space-evenly align-items-center">
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 0 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input border margin-10 ${result ? `bg-${colors[code[0]]}` : "bg-black"}`}
          ></div>
          <div
            className={`mm-input border margin-10 ${result ? `bg-${colors[code[1]]}` : "bg-black"}`}
          ></div>
          <div
            className={`mm-input border margin-10 ${result ? `bg-${colors[code[2]]}` : "bg-black"}`}
          ></div>
          <div
            className={`mm-input border margin-10 ${result ? `bg-${colors[code[3]]}` : "bg-black"}`}
          ></div>
        </div>
        <div className={`margin-center flex game-options justify-center`}>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 1 ? `bg-${colors[pastGuesses[0][0]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 1 ? `bg-${colors[pastGuesses[0][1]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 1 ? `bg-${colors[pastGuesses[0][2]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 1 ? `bg-${colors[pastGuesses[0][3]]}` : "hidden"
            }`}
          ></div>
        </div>
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 2 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input border margin-10 ${
              guesses >= 2 ? `bg-${colors[pastGuesses[1][0]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 2 ? `bg-${colors[pastGuesses[1][1]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 2 ? `bg-${colors[pastGuesses[1][2]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 2 ? `bg-${colors[pastGuesses[1][3]]}` : "hidden"
            }`}
          ></div>
        </div>
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 3 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input border margin-10 ${
              guesses >= 3 ? `bg-${colors[pastGuesses[2][0]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 3 ? `bg-${colors[pastGuesses[2][1]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 3 ? `bg-${colors[pastGuesses[2][2]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 3 ? `bg-${colors[pastGuesses[2][3]]}` : "hidden"
            }`}
          ></div>
        </div>
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 4 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input border margin-10 ${
              guesses >= 4 ? `bg-${colors[pastGuesses[3][0]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 4 ? `bg-${colors[pastGuesses[3][1]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 4 ? `bg-${colors[pastGuesses[3][2]]}` : "hidden"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              guesses >= 4 ? `bg-${colors[pastGuesses[3][3]]}` : "hidden"
            }`}
          ></div>
        </div>
      </div>

      {/* Player input */}
      <div className="margin-center flex game-options justify-center">
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuesses[0]]}`}
          onClick={() => {
            setPlayerGuesses([
              (playerGuesses[0] + 1) % 6,
              playerGuesses[1],
              playerGuesses[2],
              playerGuesses[3],
            ]);
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuesses[1]]}`}
          onClick={() => {
            setPlayerGuesses([
              playerGuesses[0],
              (playerGuesses[1] + 1) % 6,
              playerGuesses[2],
              playerGuesses[3],
            ]);
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuesses[2]]}`}
          onClick={() => {
            setPlayerGuesses([
              playerGuesses[0],
              playerGuesses[1],
              (playerGuesses[2] + 1) % 6,
              playerGuesses[3],
            ]);
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuesses[3]]}`}
          onClick={() => {
            setPlayerGuesses([
              playerGuesses[0],
              playerGuesses[1],
              playerGuesses[2],
              (playerGuesses[3] + 1) % 6,
            ]);
          }}
        ></div>
      </div>
      <div className="margin-center">
        <button
          type="button"
          className="margin-center block"
          onClick={async () => {
            pastGuesses[guesses] = playerGuesses;
            await setGuesses(guesses + 1);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}