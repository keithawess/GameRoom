import React, { useState } from "react";
import useFetchDB from "../../hooks/useFetchDB";

export default function Signup() {
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState(null);
  const { callAPI: signupCall } = useFetchDB("POST");

  return (
    <div className="username-box margin-center">
      <h1 className="text-center">Signup</h1>
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
            onBlur={() => {
              if (usernameInput.length < 3) {
                setUsernameValid(false);
                setError("Username must be at least 3 characters long.");
              } else {
                setUsernameValid(true);
              }
            }}
          />
        </div>
      </div>

      <div className="margin-center">
        <label htmlFor="passwordInput">Password: </label>
        <div className="inline-block">
          <input
            id="passwordInput"
            placeholder="Enter Password"
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            onBlur={() => {
              if (passwordInput.length < 6) {
                setPasswordValid(false);
                setError("Password must be at least 6 characters long.");
              } else {
                setPasswordValid(true);
              }
            }}
          />
        </div>
      </div>

      {/* Username Must be at least 3 characters. "Keith" will set level to 1000 */}
      <button
        type="button"
        className="margin-center margin-top-5 block"
        onClick={async () => {
          if (
            usernameInput &&
            usernameValid &&
            passwordInput &&
            passwordValid
          ) {
            let res = await signupCall("/api/users/signup", {
              username: usernameInput,
              password: passwordInput,
            });
            if (res.error) {
              return setError(res.error);
            }
            setError("Account created!");
          }
        }}
      >
        Signup
      </button>
      {error && <div className="font-small text-center">{error}</div>}
    </div>
  );
}
