import React from "react";
import { Route, Redirect } from "react-router";

export default function ProtectedRoute({ level, reqLevel, path, children}) {
    if (level >= reqLevel)
        return <Route path={path}>{children}</Route>;
    else
        return <Redirect to="/"/>
}