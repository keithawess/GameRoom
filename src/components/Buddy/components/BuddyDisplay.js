import React from "react";

export default function BuddyDisplay({ buddy }) {
  return (
    <div
      className="buddy-display-container flex col margin-center"
      style={{ border: 8 + "px solid " + buddy.color }}
    >
      {/* Displays image of Buddy */}
      <img
        className="buddy-img"
        src={buddy.img}
        alt="Here's your buddy. Aren't they cute?"
      />

      {/* Adds Nameplate for buddy. Transparent for readability */}
      <div
        className="text-center"
        style={{ backgroundColor: buddy.color + "80" }}
      >
        {buddy.name}
      </div>
    </div>
  );
}
