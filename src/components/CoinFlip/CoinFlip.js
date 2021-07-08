import React, { useEffect, useState } from "react";
import headsImg from "./images/heads.png";
import tailsImg from "./images/tails.png";
import unknownImg from "./images/unknown.png";

export default function CoinFlip({ experienceUp, level }) {
  const [flip, setFlip] = useState(-1);
  const [img, setImg] = useState(unknownImg);
  const [result, setResult] = useState(null);
  const [animationReload, setAnimationReload] = useState(1);

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
      <div className="game-board margin-center flex col justify-center">
        <div className="half">
          {flip >= 0 && (
            <img
              key={animationReload}
              className="block margin-center coin"
              src={img}
              alt="Coin"
            />
          )}
        </div>

        {/* {flip >= 0 && !result && <img className="block margin-center" src={img} alt="Coin" />}
        {result && <img src={img} alt="Coin" />} */}
        <div className="half">
          {result && (
            <div className="text-center">
              They chose {flip ? "heads" : "tails"}.
              <h3 className="text-center">Result: {result}</h3>
            </div>
          )}
        </div>
      </div>
      <div className="margin-center flex justify-center game-options">
        <button
          className="margin-center option-button"
          onClick={() => {
            if (!result && flip >= 0) {
              if (!result && flip) {
                setResult("Win");
                if (level < 1) {
                  experienceUp(10);
                }
              } else setResult("Loss");
            }
          }}
        >
          Heads
        </button>

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

        <button
          className="margin-center option-button"
          onClick={() => {
            if (!result && flip >= 0) {
              if (!flip) {
                setResult("win");
                if (level < 1) {
                  experienceUp(10);
                }
              } else setResult("loss");
            }
          }}
        >
          Tails
        </button>
      </div>
    </div>
  );
}
