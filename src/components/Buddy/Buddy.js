import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import placeholder from "./images/placeholder.png"

export default function Buddy({ buddy, setBuddy }) {
  const [appNameInput, setAppNameInput] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [reasonInput, setReasonInput] = useState("");
  const [reasonValid, setReasonValid] = useState(true);
  const [buddyNameInput, setBuddyNameInput] = useState("");
  const [buddyColor, setBuddyColor] = useState("#000000");
  const {data: name, error} = useFetch("https://randomuser.me/api/");
  const {data: buddyImg, imgError} = useFetch("https://thatcopy.pw/catapi/rest/")

  return (
    <>
      {!buddy && (
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
                  appNameInput.length < 3
                    ? setNameValid(false)
                    : setNameValid(true)
                }
              />
              {!nameValid && appNameInput.length < 3 && (
                <div className="text-red font-small">
                  {" "}
                  Must be at least 3 characters long
                </div>
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
                <option value="sad">
                  I need something to blame when I lose
                </option>
              </select>
            </div>

            <div className="margin-10">
              <label htmlFor="buddyname">Buddy Name: </label>
              <br></br>
              <input
                id="buddyname"
                placeholder={`${!error ? "Random name if blank" : "Must enter buddy name"}`}
                onChange={(e) => setBuddyNameInput(e.target.value)}
              />
            </div>

            <div className="margin-10">
              <label htmlFor="color">Favorite Color: </label>
              <br></br>
              <input
                id="color"
                type="color"
                onChange={(e) => setBuddyColor(e.target.value)}
              />
            </div>

            <button className="margin-10" type="button"
            onClick={()=>{
              if (nameValid && reasonValid)
              {
                if(buddyNameInput.length === 0 && !error)
                {
                  setBuddy({name: name.results[0].name.first, color: buddyColor, img: (!imgError? buddyImg : placeholder)})
                }
                else if (buddyNameInput.length > 0) {
                  setBuddy({name: buddyNameInput, color: buddyColor, img: (!imgError? buddyImg : placeholder)})
                }
                
              }
            }}>
              Request Buddy
            </button>
          </div>
        </div>
      )}

      {buddy && <div>I'm a buddy {buddy.name} {console.log(buddy.color)}</div>}
    </>
  );
}
