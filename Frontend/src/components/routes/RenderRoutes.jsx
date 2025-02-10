import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../layouts/PrivateRoute";

const RenderRoutes = ({ routes }) => {
  return (
    <Routes>
      {routes.map(({ path, element, isPrivate }, index) => (
        <Route
          key={index}
          path={path}
          element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
        />
      ))}
    </Routes>
  );
};

export default RenderRoutes;
