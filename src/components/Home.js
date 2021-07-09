import React, { useState } from "react";

export default function Home({ username, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);

  return (
    <div>
      <h1 className="text-center">Home</h1>
      {!username && (
        <div className="username-box margin-center">
          <div className="margin-center">
            <label htmlFor="usernameInput">Username: </label>
            <div className="inline-block">
            <input
              id="usernameInput"
              placeholder="Enter Username"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
              onBlur={()=>{
                  if(usernameInput.length < 3)
                  {
                      setUsernameValid(false);
                  }
                  else
                  {
                      setUsernameValid(true);
                  }
              }
              }
            />

            </div>
          </div>
            <div className={"font-small " + (usernameValid ? "": "text-red")}>
                Must be at least 3 characters
                </div>
          <button
            type="button"
            className="margin-center margin-top-5 block"
            onClick={() => {
              if (usernameInput.length >= 3) {
                setUsername(usernameInput);
              }
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
