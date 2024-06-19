import * as types from "./type";
const initialState = {
  isLoading: true,
  cart: [],
  isError: false,
  isSuccess: false,
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.isLoading:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case types.isError:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        isSuccess: false,
      };
    case types.isSuccess:
      return {
        ...state,
        isSuccess: false,
      };
    case types.getCartProduct:
      return {
        ...state,
        isLoading: false,
        cart: payload,
        isError: false,
      };

    case types.addToCartProduct:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        cart: [...state.cart].map((ele) => {
          return ele._id === payload._id ? payload : ele;
        }),
      };

    case types.removeCartProduct:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        cart: [...state.cart].filter((ele) => {
          return ele._id !== payload._id;
        }),
      };

    case types.updateCartProduct:
      return {
        ...state,
        isLoading: false,
        isError: false,
        cart: [...state.cart].map((ele) => {
          return ele._id === payload._id ? payload : ele;
        }),
      };

    case types.deleteAllProduct:
      return {
        ...state,
        isLoading: false,
        isError: false,
        cart: payload,
      };

    default:
      return state;
  }
};
