import React, { useState, useCallback, useEffect } from "react";
import x from "./x.png";
import o from "./o.png";

export default function TicTacToe() {
  const [playerToken, setPlayerToken] = useState("");
  const [computerToken, setComputerToken] = useState("");
  const [gameRunning, setGameRunning] = useState(false);
  const [gameGrid, setGameGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState("");

  useEffect(() => {
    console.log(gameGrid);
  }, [gameGrid]);

  const winner = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      if (gameGrid[i] + gameGrid[i + 3] + gameGrid[i + 6] === 3) {
        return "Player";
      } else if (gameGrid[i] + gameGrid[i + 3] + gameGrid[i + 6] === -3) {
        return "Computer";
      } else if (
        gameGrid[i * 3] + gameGrid[i * 3 + 1] + gameGrid[i * 3 + 2] ===
        3
      ) {
        return "Player";
      } else if (
        gameGrid[i * 3] + gameGrid[i * 3 + 1] + gameGrid[i * 3 + 2] ===
        -3
      ) {
        return "Computer";
      }
    }
    if (
      gameGrid[0] + gameGrid[4] + gameGrid[8] === 3 ||
      gameGrid[2] + gameGrid[4] + gameGrid[6] === 3
    ) {
      return "Player";
    } else if (
      gameGrid[0] + gameGrid[4] + gameGrid[8] === -3 ||
      gameGrid[2] + gameGrid[4] + gameGrid[6] === -3
    ) {
      return "Computer";
    } else {
      return "none";
    }
  }, [gameGrid]);

  const endGame = useCallback(() => {
    setGameRunning(false);
    setResult(winner());
  }, [winner]);

  const availableMove = useCallback(() => {
    let moveAvailable = false;
    for (let i = 0; i < 9; i++) {
      if (gameGrid[i] === 0) {
        return true;
      }
    }
    return moveAvailable;
  }, [gameGrid]);

  const computerMove = useCallback(() => {
    if (availableMove()) {
      if (gameGrid[4] === 0) {
        gameGrid[4] = -1;
      } else {
        let x = Math.floor(Math.random() * 9);
        while (gameGrid[x] !== 0) {
          x = Math.floor(Math.random() * 9);
        }
        gameGrid[x] = -1;
      }
      setGameGrid((curr) => [...curr]);
    } else {
      endGame();
    }

    if (winner() !== "none") {
      endGame();
    }
  }, [gameGrid, endGame, winner, availableMove]);

  const playerMove = useCallback(
    (spot) => {
      gameGrid[spot] = 1;
      setGameGrid((curr) => [...curr]);
      if (winner() === "none") {
        computerMove();
      } else {
        endGame();
      }
    },
    [gameGrid, winner, endGame, computerMove]
  );

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
                setPlayerToken(x);
                setComputerToken(o);
                setGameRunning(true);
              }}
              className="ttt-token"
              src={x}
              alt="X token"
            />
            <div></div>
            <img
              onClick={() => {
                setPlayerToken(o);
                setComputerToken(x);
                setGameRunning(true);
              }}
              className="ttt-token"
              src={o}
              alt="O Token"
            />
          </div>
        </div>
      )}
      {playerToken && (
        <div
          className={`game-board margin-center flex border wrap ${
            result ? "ttt-endgame" : ""
          }`}
        >
          <div
            onClick={() => {
              if (gameGrid[0] === 0 && gameRunning) {
                playerMove(0);
              }
            }}
            className="ttt-spot border-right border-bottom flex align-items-center justify-center"
          >
            {gameGrid[0] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[0] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[1] === 0 && gameRunning) {
                playerMove(1);
              }
            }}
            className="ttt-spot border-left border-right border-bottom flex align-items-center justify-center"
          >
            {gameGrid[1] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[1] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[2] === 0 && gameRunning) {
                playerMove(2);
              }
            }}
            className="ttt-spot border-left border-bottom flex align-items-center justify-center"
          >
            {gameGrid[2] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[2] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[3] === 0 && gameRunning) {
                playerMove(3);
              }
            }}
            className="ttt-spot border-right border-top border-bottom flex align-items-center justify-center"
          >
            {gameGrid[3] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[3] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[4] === 0 && gameRunning) {
                playerMove(4);
              }
            }}
            className="ttt-spot border flex align-items-center justify-center"
          >
            {gameGrid[4] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[4] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[5] === 0 && gameRunning) {
                playerMove(5);
              }
            }}
            className="ttt-spot border-top border-bottom border-left flex align-items-center justify-center"
          >
            {gameGrid[5] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[5] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[6] === 0 && gameRunning) {
                playerMove(6);
              }
            }}
            className="ttt-spot border-top border-right flex align-items-center justify-center"
          >
            {gameGrid[6] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[6] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[7] === 0 && gameRunning) {
                playerMove(7);
              }
            }}
            className="ttt-spot border-left border-top border-right flex align-items-center justify-center"
          >
            {gameGrid[7] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[7] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
          <div
            onClick={() => {
              if (gameGrid[8] === 0 && gameRunning) {
                playerMove(8);
              }
            }}
            className="ttt-spot border-left border-top flex align-items-center justify-center"
          >
            {gameGrid[8] === 1 && (
              <img className="ttt-token " src={playerToken} alt={playerToken} />
            )}
            {gameGrid[8] === -1 && (
              <img
                className="ttt-token "
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="flex justify-center align-items-center absolute z1">
          <div className="ttt-modal z1 text-center border-blue border-rad-10 bg-white">
            {result === "none" ? "Cat Game" : result + " wins!"}{" "}
            <div className="margin-center">
              <button onClick={()=>{
                setResult("");
                setPlayerToken("");
                setGameGrid([0,0,0,0,0,0,0,0,0]);
              }}>Play Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
