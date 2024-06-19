import * as types from "./type";
const initialState = {
  loading: true,
  error: null,
  data: [],
  orderStatus: false,
};

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.loading:
      return {
        ...state,
        loading: true,
        orderStatus: false,
      };

    case types.error: {
      return {
        ...state,
        loading: false,
        orderStatus: false,
        error: payload,
      };
    }

    case types.getOrderProduct: {
      return {
        ...state,
        loading: false,
        data: payload,
        orderStatus: false,
      };
    }

    case types.postOrderProduct: {
      return {
        ...state,
        loading: false,
        orderStatus: true,
        data: [...payload, ...state.data],
      };
    }

    case types.updateOrderProduct:
      return {
        ...state,
        loading: false,
        orderStatus: true,
        data: [...state.data].map((ele) =>
          ele._id === payload._id ? payload : ele
        ),
      };

    case types.resetOrderStatus: {
      return { ...state, orderStatus: false };
    }
    default:
      return state;
  }
};
