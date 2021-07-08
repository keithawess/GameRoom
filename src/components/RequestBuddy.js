import React, { useState } from "react";

export default function RequestBuddy() {
  const [appNameInput, setAppNameInput] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [reasonInput, setReasonInput] = useState("");
  const [reasonValid, setReasonValid] = useState(true);
  const [buddyNameInput, setBuddyNameInput] = useState("");
  const [buddyColor, setBuddyColor] = useState("");

  return (
    <div>
      <div>Request Buddy</div>

      <div className="buddy-form border margin-center">
        <div className="margin-10">
          <label htmlFor="name">Applicant Name: </label>
          <br></br>
          <input
            id="name"
            value={appNameInput}
            onChange={(e) => setAppNameInput(e.target.value)}
            onBlur={(e) =>
              appNameInput.length < 3 ? setNameValid(false) : setNameValid(true)
            }
          />
          {!nameValid && appNameInput.length < 3 && (
            <span className="text-red font-small">
              {" "}
              Must be at least 3 characters long
            </span>
          )}
        </div>
        <div></div>
        <div className="margin-10">
          <label htmlFor="reason">Reason for Application: </label>
          <br></br>
          <select
            id="reason"
            className={`${!reasonValid ? "border-red" : ""}`}
            value={reasonInput}
            onChange={(e) => setReasonInput(e.target.value)}
            onBlur={(e) =>
              reasonInput === "sad"
                ? setReasonValid(false)
                : setReasonValid(true)
            }
          >
            <option>I work better in a team</option>
            <option>I get lonely when I play games</option>
            <option>I get distracted without accountability</option>
            <option value="sad">I need something to blame when I lose</option>
          </select>
        </div>

        <div className="margin-10">
          <label htmlFor="buddyname">Buddy Name: </label>
          <br></br>
          <input
            id="buddyname"
            placeholder="Random name if blank"
            onChange={(e) => setBuddyNameInput(e.target.value)}
          />
        </div>

        <div className="margin-10">
            <label htmlFor="color">Favorite Color: </label>
            <br></br>
            <input id="color" type="color" onChange={(e)=> setBuddyColor(e.target.value)}/>
        </div>

        <button className="margin-10" type="button">Request Buddy</button>
      </div>
    </div>
  );
}
