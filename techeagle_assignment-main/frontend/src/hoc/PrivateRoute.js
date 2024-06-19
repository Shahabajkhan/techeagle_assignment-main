import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const { loggedInUser } = useSelector((store) => store.authenticationReducer);

  if (!loggedInUser) {
    return <Navigate to={"/"} />;
  }
  return children;
};
