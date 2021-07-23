import React, { useCallback, useEffect, useState } from "react";

export default function Mastermind() {
  //State
  const [guesses, setGuesses] = useState(0);
  const [playerGuess, setPlayerGuess] = useState([0, 0, 0, 0]);
  const [pastGuesses, setPastGuesses] = useState(
    Array(4).fill(Array(4).fill(0))
  );
  const [code, setCode] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [result, setResult] = useState(null);
  //Colors Options
  const colors = ["red", "yellow", "blue", "green", "purple", "orange"];

  const generateCode = useCallback(() => {
    let temp = [];
    for (let i = 0; i < 4; i++) {
      temp[i] = Math.floor(Math.random() * 6);
    }
    console.log(temp);
    return temp;
  }, []);

  const startGame = useCallback(() => {
    setGuesses(0);
    setPastGuesses(Array(4).fill(Array(4).fill(0)));
    setGameRunning(true);
    setCode(generateCode());
  }, []);
  
  const endGame = useCallback((result) => {
    setGameRunning(false);
    setResult(result);
  }, []);
  
  const checkCode = useCallback(()=> {
    let reds = 0;
    let whites = 0;
    let taken = [];

    for (let i = 0; i < 4; i++)
    {
      if(playerGuess[i] === code[i])
      {
        reds++;
        taken.push(i);
      } else {
        for(let j = 0; j < 4; j++)
        {
          if (playerGuess[i] === code[j] && !taken.includes(j))
          {
            whites++;
            taken.push(j);
            break;
          }
        }
      }
    }
    console.log(reds, whites)
    if (reds === 4)
    {
      endGame("win");
    }

    
  })

  useEffect(() => {
    console.log(playerGuess);
  }, [playerGuess]);

  useEffect(() => {
    console.log(pastGuesses);
  }, [pastGuesses]);

  return (
    <div>
      <h1
        className="text-center"
        onClick={() => {
          if (gameRunning === false) {
            startGame();
          }
          if (gameRunning === true) {
            endGame();
          }
        }}
      >
        Mastermind
      </h1>

      {/* Game Board */}
      <div className="game-board margin-center flex wrap space-evenly align-items-center">
        <div
          className={`margin-center flex game-options justify-center ${
            guesses >= 0 ? "" : "hidden"
          }`}
        >
          <div
            className={`mm-input border margin-10 ${
              result ? `bg-${colors[code[0]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              result ? `bg-${colors[code[1]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              result ? `bg-${colors[code[2]]}` : "bg-black"
            }`}
          ></div>
          <div
            className={`mm-input border margin-10 ${
              result ? `bg-${colors[code[3]]}` : "bg-black"
            }`}
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
          className={`mm-input border margin-10 bg-${colors[playerGuess[0]]}`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                (playerGuess[0] + 1) % 6,
                playerGuess[1],
                playerGuess[2],
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuess[1]]}`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                (playerGuess[1] + 1) % 6,
                playerGuess[2],
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuess[2]]}`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                playerGuess[1],
                (playerGuess[2] + 1) % 6,
                playerGuess[3],
              ]);
            }
          }}
        ></div>
        <div
          className={`mm-input border margin-10 bg-${colors[playerGuess[3]]}`}
          onClick={() => {
            if (gameRunning) {
              setPlayerGuess([
                playerGuess[0],
                playerGuess[1],
                playerGuess[2],
                (playerGuess[3] + 1) % 6,
              ]);
            }
          }}
        ></div>
      </div>
      <div className="margin-center">
        <button
          type="button"
          className="margin-center block"
          onClick={async () => {
            if(gameRunning){
              pastGuesses[guesses] = playerGuess;
              await setGuesses(guesses + 1);
              checkCode();
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
