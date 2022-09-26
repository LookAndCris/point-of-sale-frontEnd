const intialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return { ...state, loading: true };
    case "HIDE_LOADER":
      return { ...state, loading: false };

    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
