import {
  addItemToMyCart,
  removeFromMyCart,
  increamentQty,
  decreamentQty,
} from "../utility/cartUtility";

export const initCart = [];

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return (state = addItemToMyCart(state, action.payload));
    case "REMOVE_FROM_CART":
      return (state = removeFromMyCart(state, action.payload));
    case "INCREASE_QUANTITY":
      return (state = increamentQty(state, action.payload));
    case "REDUCE_QUANTITY":
      return (state = decreamentQty(state, action.payload));
    case 'CLEAR_CART':
      return []
    default:
      return state;
  }
};
