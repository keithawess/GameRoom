import React, { useState, useCallback, useContext } from "react";
import { UserContext, StatsContext } from "../../context";
import x from "./x.png";
import o from "./o.png";

export default function TicTacToe() {
  // State
  const [playerToken, setPlayerToken] = useState("");
  const [computerToken, setComputerToken] = useState("");
  const [gameRunning, setGameRunning] = useState(false);
  const [gameGrid, setGameGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState("");
  const [winningSet, setWinningSet] = useState("");
  const { experienceUp, level, userId } = useContext(UserContext);
  const { addWin, addLoss, addTie } = useContext(StatsContext);

  // Checks if winning move has been made. Returns who won.
  const winner = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      if (gameGrid[i] + gameGrid[i + 3] + gameGrid[i + 6] === 3) {
        switch (i) {
          case 0:
            setWinningSet("set4");
            break;
          case 1:
            setWinningSet("set5");
            break;
          case 2:
            setWinningSet("set6");
            break;
          default:
            break;
        }
        return "Player";
      } else if (gameGrid[i] + gameGrid[i + 3] + gameGrid[i + 6] === -3) {
        switch (i) {
          case 0:
            setWinningSet("set4");
            break;
          case 1:
            setWinningSet("set5");
            break;
          case 2:
            setWinningSet("set6");
            break;
          default:
            break;
        }
        return "Computer";
      } else if (
        gameGrid[i * 3] + gameGrid[i * 3 + 1] + gameGrid[i * 3 + 2] ===
        3
      ) {
        switch (i) {
          case 0:
            setWinningSet("set1");
            break;
          case 1:
            setWinningSet("set2");
            break;
          case 2:
            setWinningSet("set3");
            break;
          default:
            break;
        }
        return "Player";
      } else if (
        gameGrid[i * 3] + gameGrid[i * 3 + 1] + gameGrid[i * 3 + 2] ===
        -3
      ) {
        switch (i) {
          case 0:
            setWinningSet("set1");
            break;
          case 1:
            setWinningSet("set2");
            break;
          case 2:
            setWinningSet("set3");
            break;
          default:
            break;
        }
        return "Computer";
      }
    }
    if (gameGrid[0] + gameGrid[4] + gameGrid[8] === 3) {
      setWinningSet("set7");
      return "Player";
    } else if (gameGrid[0] + gameGrid[4] + gameGrid[8] === -3) {
      setWinningSet("set7");
      return "Computer";
    } else if (gameGrid[2] + gameGrid[4] + gameGrid[6] === 3) {
      setWinningSet("set8");
      return "Player";
    } else if (gameGrid[2] + gameGrid[4] + gameGrid[6] === -3) {
      setWinningSet("set8");
      return "Computer";
    } else {
      return "none";
    }
  }, [gameGrid]);

  // Ends game. Shows who won.
  const endGame = useCallback(() => {
    setGameRunning(false);
    setResult(winner());
  }, [winner]);

  // Checks to see if computer can make a move.
  const availableMove = useCallback(() => {
    let moveAvailable = false;
    for (let i = 0; i < 9; i++) {
      if (gameGrid[i] === 0) {
        return true;
      }
    }
    return moveAvailable;
  }, [gameGrid]);

  // Computer makes move. Currently prioritizes center spot, then random.
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
      addTie(userId);
      endGame();
    }

    if (winner() !== "none") {
      addLoss(userId);
      endGame();
    }
  }, [gameGrid, endGame, winner, availableMove]);

  // Displays player move, then has computer make a move.
  const playerMove = useCallback(
    (spot) => {
      gameGrid[spot] = 1;
      setGameGrid((curr) => [...curr]);
      if (winner() === "none") {
        computerMove();
      } else {
        endGame();
        addWin(userId);
        if (level < 3) {
          experienceUp(10);
        }
      }
    },
    [gameGrid, winner, endGame, computerMove, level, experienceUp]
  );

  return (
    <div>
      <h1 className="text-center">Tic Tac Toe</h1>
      {/* Gives player option to choose X or O */}
      {!playerToken && (
        <div className="text-center game-board margin-center">
          <h3>Pick One:</h3>
          <div className="flex space-evenly margin-center">
            <img
              onClick={() => {
                setPlayerToken(x);
                setComputerToken(o);
                setGameRunning(true);
              }}
              className="ttt-token unlocked"
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
              className="ttt-token unlocked"
              src={o}
              alt="O Token"
            />
          </div>
        </div>
      )}

      {/* Displays game board after player chooses tokens. Each div has a designated set (for highlighting)
        When div is clicked, player move is made if spot is not already taken*/}
      {playerToken && (
        <div
          className={`game-board margin-center flex wrap ${
            result ? "ttt-endgame" : ""
          }`}
        >
          <div
            onClick={() => {
              if (gameGrid[0] === 0 && gameRunning) {
                playerMove(0);
              }
            }}
            className={`ttt-spot border-right border-bottom flex align-items-center justify-center ${
              winningSet === "set1" ||
              winningSet === "set4" ||
              winningSet === "set7"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[0] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[0] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-left border-right border-bottom flex align-items-center justify-center ${
              winningSet === "set1" || winningSet === "set5"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[1] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[1] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-left border-bottom flex align-items-center justify-center ${
              winningSet === "set1" ||
              winningSet === "set6" ||
              winningSet === "set8"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[2] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[2] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-right border-top border-bottom flex align-items-center justify-center ${
              winningSet === "set2" || winningSet === "set4"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[3] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[3] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border flex align-items-center justify-center ${
              winningSet === "set2" ||
              winningSet === "set5" ||
              winningSet === "set7" ||
              winningSet === "set8"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[4] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[4] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-top border-bottom border-left flex align-items-center justify-center ${
              winningSet === "set2" || winningSet === "set6"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[5] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[5] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-top border-right flex align-items-center justify-center ${
              winningSet === "set3" ||
              winningSet === "set4" ||
              winningSet === "set8"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[6] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[6] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-left border-top border-right flex align-items-center justify-center ${
              winningSet === "set3" || winningSet === "set5"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[7] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[7] === -1 && (
              <img
                className="ttt-token ttt-computer"
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
            className={`ttt-spot border-left border-top flex align-items-center justify-center ${
              winningSet === "set3" ||
              winningSet === "set6" ||
              winningSet === "set7"
                ? result === "Player"
                  ? "bg-blue-6"
                  : "ttt-loss"
                : ""
            }`}
          >
            {gameGrid[8] === 1 && (
              <img
                className="ttt-token ttt-player"
                src={playerToken}
                alt={playerToken}
              />
            )}
            {gameGrid[8] === -1 && (
              <img
                className="ttt-token ttt-computer"
                src={computerToken}
                alt={computerToken}
              />
            )}
          </div>
        </div>
      )}

      {/* Displays modal allowing player to restart game. */}
      {result && (
        <div className="flex justify-center align-items-center absolute absolute-center z1">
          <div className="ttt-modal z1 text-center border-blue border-rad-10 bg-white">
            {result === "none" ? "Cat Game" : result + " wins!"}{" "}
            <div className="margin-center">
              <button
                onClick={() => {
                  setResult("");
                  setPlayerToken("");
                  setGameGrid([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                  setWinningSet("");
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
