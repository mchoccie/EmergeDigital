import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes, redirects } from "Routes/PageRoutes";

/**
 * Represents the Routes component which manages page switching component
 * @returns {JSX} - JSX syntax for Route components
 */
const Routes = () => {
  const data = useSelector((state) => state.user);

  const routeComponents = routes.map((route, key) => {
    const { path, component: Component, auth } = route;
    return (
      <Route exact path={path} key={key}>
        {auth.includes(data.userType) ? (
          <Component />
        ) : (
          <Redirect to={redirects[data.userType]} />
        )}
      </Route>
    );
  });

  return (
    <React.Fragment>
      <Switch>{routeComponents}</Switch>
    </React.Fragment>
  );
};

export default Routes;
