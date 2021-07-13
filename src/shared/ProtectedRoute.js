import React from "react";
import { Route, Redirect } from "react-router";

export default function ProtectedRoute({ level, reqLevel, path, children }) {
  // Restricts access depending on level. If level is too low, redirects back to home.
  if (level >= reqLevel) return <Route path={path}>{children}</Route>;
  else return <Redirect to="/" />;
}
