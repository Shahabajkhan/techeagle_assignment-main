import * as types from "./type";
import Cookies from "js-cookie";
const initialState = {
  loggedInUser: Cookies.get(`${process.env.REACT_APP_JWT_TOKEN}`) || null,
  loading: false,
  error: false,
  userDetails: Cookies.get(`${process.env.REACT_APP_USER_DATA}`)
    ? JSON?.parse(Cookies.get(`${process.env.REACT_APP_USER_DATA}`))
    : null,
};

export const authenticationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.loading:
      return { ...state, loading: true, error: false };
    case types.error:
      return { ...state, error: payload, loading: false };
    case types.loginSuccess:
      return {
        ...state,
        loggedInUser: payload.jwt_token,
        userDetails: payload.userData,
        loading: false,
        error: false,
      };

      case types.logoutSuccess:
        return {
        ...state,
          loggedInUser: null,
          userDetails: null,
          loading: false,
          error: false,
        };
    default:
      return state;
  }
};
