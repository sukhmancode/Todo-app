import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
  [x: string]: any;
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/signup" state={{ from: rest.location }} />
        )
      }
    />
  );
};

export default PrivateRoute;