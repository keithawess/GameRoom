import React, { useEffect, useState } from "react";

export default function Mastermind({ experienceUp, level }) {
  //State

  //Colors Options
  const colors = ["red", "yellow", "blue", "green", "black", "white"];

  return (
    <div>
      <h1 className="text-center">Mastermind</h1>

      {/* Game Board */}
      <div className="game-board margin-center flex space-evenly align-items-center"></div>
      <div className="margin-center flex game-options justify-center">
        <div className="mm-input border margin-10"></div>
        <div className="mm-input border margin-10"></div>
        <div className="mm-input border margin-10"></div>
        <div className="mm-input border margin-10"></div>
      </div>
    </div>
  );
}
