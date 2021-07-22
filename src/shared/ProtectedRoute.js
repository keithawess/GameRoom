import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../context";

export default function ProtectedRoute({ reqLevel, path, children }) {
  const { level } = useContext(UserContext);
  // Restricts access depending on level. If level is too low, redirects back to home.
  if (level >= reqLevel) return <Route path={path}>{children}</Route>;
  else return <Redirect to="/" />;
}
