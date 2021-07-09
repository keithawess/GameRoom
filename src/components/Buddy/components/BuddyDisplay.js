import React from "react";

export default function ({ buddy }) {
  return (
    <div className="buddy-display-container flex col margin-center" style={{border: 8 + "px solid " + buddy.color}}>
      <img className="buddy-img" src={buddy.img}/>
      <div className="text-center" style={{backgroundColor: buddy.color + "80"}}>{buddy.name}</div>
    </div>
  );
}
