export const REMOVE_ITEM = "REMOVE_ITEM";

export const cartState = {
  items: [],
  totalPrice: 0,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case REMOVE_ITEM:
      return { ...state };
  }
}
