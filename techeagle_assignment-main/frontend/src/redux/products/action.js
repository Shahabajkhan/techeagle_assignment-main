import { cookiesGetter } from "../../utils/cookies";
import * as types from "./type";
import axios from "axios";
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

const getProductAction = (payload) => {
  return {
    type: types.getProduct,
    payload,
  };
};

const deleteProductAction = (payload) => {
  return {
    type: types.deleteProduct,
    payload,
  };
};

const addProductAction = (payload) => {
  return {
    type: types.addProduct,
    payload,
  };
};

const updateProductAction = (payload) => {
  return {
    type: types.updateProduct,
    payload,
  };
};
export const productAddReset = () => {
  return {
    type: types.resetAddProductStatus,
  };
};
export const getProductDataFromApi = () => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product`
    );
    const data = response.data;
    dispatch(getProductAction(data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const addProductToApi = (payload) => async (dispatch) => {
  const token = cookiesGetter();
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/product`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    dispatch(addProductAction(response?.data?.data));
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const deleteProductDataFromApi = (id) => async (dispatch) => {
  const token = cookiesGetter();
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    dispatch(deleteProductAction(response?.data?.data));
    console.log(response?.data?.data, "api");
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};

export const updateProductActionApi = (id, payload) => async (dispatch) => {
  const token = cookiesGetter();
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    dispatch(updateProductAction(response?.data?.data))
  } catch (error) {
    dispatch(errorAction(error?.response?.data?.message || error?.message));
  }
};
