import * as types from "./type";
const initialState = {
  loading: true,
  data: [],
  error: false,
  isSuccess: false,
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.loading:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case types.error:
      return {
        ...state,
        loading: false,
        error: payload,
        isSuccess: false,
      };
    case types.getProduct:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case types.addProduct:
      return {
        ...state,
        loading: false,
        data: [payload, ...state.data],
        isSuccess: true,
      };
    case types.deleteProduct:
      return {
        ...state,
        loading: false,
        data: [...state.data].filter((ele) => {
          return ele._id !== payload._id;
        }),
      };
    case types.updateProduct:
      return {
        ...state,
        data: [...state.data].map((ele) => {
          return ele._id === payload._id ? payload : ele
        }),
      };
    case types.resetAddProductStatus:
      return {
        ...state,

        isSuccess: false,
      };
    default:
      return state;
  }
};
