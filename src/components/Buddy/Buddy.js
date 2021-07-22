import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFetchDB from "../../hooks/useFetchDB";
import placeholder from "./images/placeholder.png";
import BuddyDisplay from "./components/BuddyDisplay";
import { UserContext, BuddyContext } from "../../context";

export default function Buddy() {
  // States
  const [appNameInput, setAppNameInput] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [reasonInput, setReasonInput] = useState("");
  const [reasonValid, setReasonValid] = useState(true);
  const [buddyNameInput, setBuddyNameInput] = useState("");
  const [buddyColor, setBuddyColor] = useState("#000000");

  const { username, userId } = useContext(UserContext);
  const { buddy, setBuddy } = useContext(BuddyContext);

  const { callAPI: buddyCall } = useFetchDB("PUT");
  // Name and buddy image are both chosen as page starts.
  const { data: name, error } = useFetch("https://randomuser.me/api/");
  const { data: buddyImg, imgError } = useFetch(
    "https://thatcopy.pw/catapi/rest/"
  );

  return (
    <>
      {/* Displays form for buddy if one doesn't exist */}
      {!buddy && (
        <div>
          <h1 className="text-center">Request Buddy</h1>

          <div className="buddy-form border-blue border-rad-10 margin-center">
            <div className="margin-10">
              {/* Applicant name requires at least 3 characters, and needs to match username if provided */}
              <label htmlFor="name">Applicant Name: </label>
              <br></br>
              <input
                id="name"
                value={appNameInput}
                onChange={(e) => setAppNameInput(e.target.value)}
                onBlur={() => {
                  if (
                    appNameInput.length < 3 ||
                    (username &&
                      appNameInput.toLowerCase() !== username.toLowerCase())
                  ) {
                    setNameValid(false);
                  } else {
                    setNameValid(true);
                  }
                }}
              />
              {/* Displays error Messages */}
              {!nameValid && appNameInput.length < 3 && (
                <div className="text-red font-small">
                  Must be at least 3 characters long
                </div>
              )}
              {!nameValid &&
                appNameInput.length > 2 &&
                username.toLowerCase() !== appNameInput.toLowerCase() && (
                  <div className="text-red font-small">
                    Identity theft is not joke, {username}!
                  </div>
                )}
            </div>
            <div></div>
            <div className="margin-10">
              {/* Cannot be last option */}
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
              {/* If this field is left blank, pulls random name using an API */}
              <label htmlFor="buddyname">Buddy Name: </label>
              <br></br>
              <input
                id="buddyname"
                placeholder={`${
                  !error ? "Random name if blank" : "Must enter buddy name"
                }`}
                onChange={(e) => setBuddyNameInput(e.target.value)}
              />
            </div>
            {/* Color input for BuddyDisplay border */}
            <div className="margin-10">
              <label htmlFor="color">Favorite Color: </label>
              <br></br>
              <input
                id="color"
                type="color"
                onChange={(e) => setBuddyColor(e.target.value)}
              />
            </div>

            {/* Submits data if data is valid */}
            <button
              className="margin-10"
              type="button"
              onClick={async () => {
                if (nameValid && reasonValid && appNameInput.length > 2) {
                  if (buddyNameInput.length === 0 && !error) {
                    setBuddy({
                      name: name.results[0].name.first,
                      color: buddyColor,
                      url: !imgError ? buddyImg.url : placeholder,
                    });
                    let res = await buddyCall("/api/buddies/add", {
                      userId: userId,
                      name: name.results[0].name.first,
                      color: buddyColor,
                      url: !imgError ? buddyImg.url : placeholder,
                    });
                  } else if (buddyNameInput.length > 0) {
                    setBuddy({
                      name: buddyNameInput,
                      color: buddyColor,
                      url: !imgError ? buddyImg.url : placeholder,
                    });
                    let res = await buddyCall("/api/buddies/add", {
                      userId: userId,
                      name: buddyNameInput,
                      color: buddyColor,
                      url: !imgError ? buddyImg.url : placeholder,
                    });
                  }
                }
              }}
            >
              Request Buddy
            </button>
          </div>
        </div>
      )}

      {/* Displays buddy if buddy exists */}
      {buddy && (
        <div className="text-center">
          <div
            className=" margin-top-130"
            title="Here is your buddy! You cannot trade them in for
          another, cus that's not what buddies do."
          >
            <BuddyDisplay buddy={buddy} />
          </div>
        </div>
      )}
    </>
  );
}
