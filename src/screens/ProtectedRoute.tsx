import { useIsAuthenticated } from "@azure/msal-react";
import { Redirect, Route } from "react-router-dom";

type Props = {
  component: any;
  exact: boolean;
  [rest: string]: any;
  render?: any;
};
const ProtectedRoute = ({
  component: Component,
  exact,
  rest,
  render,
}: Props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Route
      exact={exact}
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/" />;

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
