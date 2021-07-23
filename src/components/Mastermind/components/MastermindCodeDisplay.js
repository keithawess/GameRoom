import React from "react";

export default function MastermindCodeDisplay({
  color1,
  color2,
  color3,
  color4,
  feedback,
}) {
  let feedbackList = [];
  for (let i = 0; i < feedback[0]; i++) {
    feedbackList.push(
      <div className="mm-clue circle margin-1 border bg-red"></div>
    );
  }
  for (let i = 0; i < feedback[1]; i++) {
    feedbackList.push(
      <div className="mm-clue circle margin-1 border bg-white"></div>
    );
  }
  while (feedbackList.length < 4) {
    feedbackList.push(
      <div className="mm-clue circle margin-1 border bg-black"></div>
    );
  }

  return (
    <div className={`margin-center flex game-options justify-center`}>
      <div className="mm-input">&nbsp;</div>
      <div className="mm-input">&nbsp;</div>

      <div className={`mm-input circle border margin-10 bg-${color1}`}></div>
      <div className={`mm-input circle border margin-10 bg-${color2}`}></div>
      <div className={`mm-input circle border margin-10 bg-${color3}`}></div>
      <div className={`mm-input circle border margin-10 bg-${color4}`}></div>
      <div className={`mm-input margin-10 flex wrap`}>{feedbackList}</div>
    </div>
  );
}
