import React, { useContext, useEffect, useState } from "react";
import headsImg from "./images/heads.png";
import tailsImg from "./images/tails.png";
import unknownImg from "./images/unknown.png";
import { UserContext, StatsContext } from "../../context";

export default function CoinFlip() {
  // States
  const [flip, setFlip] = useState(-1);
  const [img, setImg] = useState(unknownImg);
  const [result, setResult] = useState(null);
  const [animationReload, setAnimationReload] = useState(1);

  const { experienceUp, level, userId } = useContext(UserContext);
  const { addWin, addLoss } = useContext(StatsContext);

  // Image of coin changes when result is decided.
  useEffect(() => {
    if (!result) {
      setImg(unknownImg);
    } else {
      flip ? setImg(headsImg) : setImg(tailsImg);
    }
  }, [flip, result]);

  return (
    <div>
      <h1 className="text-center">Heads or Tails?</h1>
      {/* Game Board */}
      <div className="game-board margin-center flex col justify-center">
        <div className="half">
          {/* Displays Image for coin only after the first flip. */}
          {flip >= 0 && (
            <img
              key={animationReload}
              className="block margin-center coin"
              src={img}
              alt="Coin"
            />
          )}
        </div>

        {/* Displays Results when determined */}
        <div className="half">
          {result && (
            <div className="text-center">
              They chose {flip ? "heads" : "tails"}.
              <h3 className="text-center">Result: {result}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Shows choices after coin is flipped for the first time. */}
      <div className="margin-center flex justify-center game-options">
        {flip >= 0 && (
          <button
            className="margin-center option-button"
            onClick={() => {
              if (!result && flip >= 0) {
                if (!result && flip) {
                  setResult("Win");
                  addWin(userId);
                  if (level < 1) {
                    experienceUp(10);
                  }
                } else {
                  addLoss(userId);
                  setResult("Loss");
                }
              }
            }}
          >
            Heads
          </button>
        )}

        <button
          className="margin-center block"
          onClick={() => {
            setResult(null);
            setAnimationReload(Math.random());
            setFlip(Math.floor(Math.random() * 2));
          }}
        >
          Flip
        </button>

        {flip >= 0 && (
          <button
            className="margin-center option-button"
            onClick={() => {
              if (!result && flip >= 0) {
                if (!flip) {
                  setResult("win");
                  console.log(userId);
                  addWin(userId);
                  if (level < 1) {
                    experienceUp(10);
                  }
                } else {
                  addLoss(userId);
                  setResult("Loss");
                }
              }
            }}
          >
            Tails
          </button>
        )}
      </div>
    </div>
  );
}
