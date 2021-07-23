import React from "react";

export default function MastermindCodeDisplay({ color1, color2, color3, color4 })
{
  return (
    <div className={`margin-center flex game-options justify-center`}>
      <div
        className={`mm-input circle border margin-10 bg-${color1}`}
      ></div>
      <div
        className={`mm-input circle border margin-10 bg-${color2}`}
      ></div>
      <div
        className={`mm-input circle border margin-10 bg-${color3}`}
      ></div>
      <div
        className={`mm-input circle border margin-10 bg-${color4}`}
      ></div>
      <div className={`mm-input border margin-10`}></div>
    </div>
  );
}
