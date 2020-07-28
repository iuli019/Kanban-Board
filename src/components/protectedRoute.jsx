import React from "react";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          toast("No token!");
          return <Redirect to="/login" />;
        }
        return Component ? <Component {...rest} /> : render(rest);
      }}
    />
  );
}

export default ProtectedRoute;
