import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function CoinFlip({experienceUp, level}) {
  const [flip, setFlipped] = useState(null);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div>
      CoinFlip
      <h1 className="text-center">Heads or Tails?</h1>
      <div className="game-board border margin-center">
        <button
          onClick={() => {
            setResult(null);
            setFlipped(Math.floor(Math.random() * 2));
          }}
        >
          Flip
        </button>
        {result && <div>{flip}</div>}
        {result && <div>{result}</div>}
      </div>
      <div className="width-90 margin-center flex justify-center game-options">
        <button
          className="margin-center option-button"
          onClick={() => {
            if (flip)
            {
                setResult("win");
                experienceUp(10);
            } 
            else setResult("loss");
          }}
        >
          Heads
        </button>
        <button
          className="margin-center option-button"
          onClick={() => {
            if (!flip)
            {
                setResult("win");
                experienceUp(10);
            } 
            else setResult("loss");
          }}
        >
           Tails
        </button>
      </div>
    </div>
  );
}
