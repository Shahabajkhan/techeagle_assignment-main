import * as types from "./type";
import axios from "axios";
import Cookies from "js-cookie";
import { removeCookie } from "../../utils/cookies";
import { keys } from "../../constant/constant";
const loadingAction = () => {
  return {
    type: types.loading,
  };
};

const errorAction = (payload) => {
  return {
    type: types.error,
    payload,
  };
};

const loginAction = (payload) => {
  return {
    type: types.loginSuccess,
    payload,
  };
};
export const logoutUser = () => {
  return { type: types.logoutSuccess };
};
export const getUserLoggedIn = (payload) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/login`,
      payload
    );

    console.log("response data", response);
    const jwt_token = response.data.jwt_token;
    const refresh_token = response.data.refresh_token;
    const userData = response?.data?.data;
    Cookies.set(`${process.env.REACT_APP_JWT_TOKEN}`, jwt_token, {
      expires: 2,
      secure: true,
    });
    Cookies.set(`${process.env.REACT_APP_REFRESH_TOKEN}`, refresh_token, {
      expires: 4,
      secure: true,
    });
    Cookies.set(
      `${process.env.REACT_APP_USER_DATA}`,
      JSON.stringify(userData),
      {
        expires: 4,
        secure: true,
      }
    );
    dispatch(loginAction({ jwt_token, refresh_token, userData }));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const logoutUserFromApi = () => async (dispatch) => {
  for (let i = 0; i < keys.length; i++) {
    removeCookie(keys[i]);
  }
  dispatch(logoutUser());
};
