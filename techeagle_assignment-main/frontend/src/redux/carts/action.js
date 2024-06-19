import { cookiesGetter } from "../../utils/cookies";
import * as types from "./type";

import axios from "axios";
export const loadingAction = () => {
  return {
    type: types.isLoading,
  };
};
export const successAction = () => {
  return {
    type: types.isSuccess,
  };
};

const errorAction = (payload) => {
  return {
    type: types.isError,
    payload,
  };
};

const getCartAction = (payload) => {
  return {
    type: types.getCartProduct,
    payload,
  };
};

const deleteAll = (payload) => {
  return {
    type: types.deleteAllProduct,
    payload,
  };
};

const addToCartAction = (payload) => {
  return {
    type: types.addToCartProduct,
    payload,
  };
};
const removeFromCartAction = (payload) => {
  return {
    type: types.removeCartProduct,
    payload,
  };
};
const updateCartAction = (payload) => {
  return {
    type: types.updateCartProduct,
    payload,
  };
};
export const getCartDataFromApi = () => async (dispatch) => {
  dispatch(loadingAction());
 const token =(cookiesGetter());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = response?.data;
    
    console.log("data from  cart",data)
    dispatch(getCartAction(data));
  } catch (error) {
    console.log(error);
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const addToCartDataInUserDataBase = (payload) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/cart`,
      payload,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    const data = response?.data?.data;
    dispatch(addToCartAction(data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const removeCartProductApi = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/cart/${id}`,

      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    const data = response?.data?.data;
    dispatch(removeFromCartAction(data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const updateCartProductApi = (id, payload) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/cart/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    const data = response?.data?.data;
    dispatch(updateCartAction(data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const deleteAllCartApi = () => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/cart/delete/all`,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    const data = response?.data?.data;
    dispatch(deleteAll(data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};
