import React, { useEffect, useState } from "react";
import headsImg from "./images/heads.png";
import tailsImg from "./images/tails.png";
import unknownImg from "./images/unknown.png";

export default function CoinFlip({ experienceUp, level }) {
  const [flip, setFlipped] = useState(-1);
  const [img, setImg] = useState(unknownImg);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!result) {
      setImg(unknownImg);
    } else {
       (flip) ? setImg(headsImg) : setImg(tailsImg);
    }
  }, [flip, result]);

  return (
    <div>
      CoinFlip
      <h1 className="text-center">Heads or Tails?</h1>
      <div className="game-board border margin-center">
        {flip >= 0 && !result && <img src={img} alt="Coin" />}
        {result && <img src={img} alt="Coin" />}
        {result && <div>{result}</div>}
        <div>
          <button
            onClick={() => {
              setResult(null);
              setFlipped(Math.floor(Math.random() * 2));
            }}
          >
            Flip
          </button>
        </div>
      </div>
      <div className="margin-center flex justify-center game-options">
        <button
          className="margin-center option-button"
          onClick={() => {
            if (!result && flip) {
              setResult("win");
              experienceUp(10);
            } else setResult("loss");
          }}
        >
          Heads
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            if (!result && !flip) {
              setResult("win");
              experienceUp(10);
            } else setResult("loss");
          }}
        >
          Tails
        </button>
      </div>
    </div>
  );
}
