import React from "react";

export default function BuddyDisplay({ buddy }) {
  return (
    <div className="buddy-display-container flex col margin-center" style={{border: 8 + "px solid " + buddy.color}}>
      <img className="buddy-img" src={buddy.img} alt="Here's your buddy. Aren't they cute?"/>
      <div className="text-center" style={{backgroundColor: buddy.color + "80"}}>{buddy.name}</div>
    </div>
  );
}
