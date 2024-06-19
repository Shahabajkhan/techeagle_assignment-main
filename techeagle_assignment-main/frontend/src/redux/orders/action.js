import { cookiesGetter } from "../../utils/cookies";
import * as types from "./type";
import axios from "axios";
export const loadingAction = () => {
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

const getOrder = (payload) => {
  return {
    type: types.getOrderProduct,
    payload,
  };
};

export const orderStatusRest = () => {
  return {
    type: types.resetOrderStatus,
   
  };
};
const postOrder = (payload) => {
  return {
    type: types.postOrderProduct,
    payload,
  };
};

const updateOrder = (payload) => {
  return {
    type: types.updateOrderProduct,
    payload,
  };
};

export const getOrderProductApi = () => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/order`,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );

    dispatch(getOrder(response?.data?.data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};
export const postOrderProductApi = (payload) => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/order`,
      payload,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    dispatch(postOrder(response?.data?.data?.products));
  } catch (error) {
    console.log(error);
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const updateOrderProductApi = (id,payload) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/order/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${cookiesGetter()}`,
        },
      }
    );
    console.log(response, " ia m from api update");
    dispatch(updateOrder(response?.data?.data));
  } catch (error) {
    console.log(error);
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

