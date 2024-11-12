import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateItems = [...state.items];

    if (existCartItemIndex > -1) {
      const existItems = state.items[existCartItemIndex];
      const updatedItems = {
        ...existItems,
        quantity: existItems.quantity + 1
      };

      updateItems[existCartItemIndex] = updatedItems;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existCartItemIndex];
    const updateItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updateItems.splice(existCartItemIndex, 1);
    } else {
      const updatedItems = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1
      };
      updateItems[existCartItemIndex] = updatedItems;
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "CLEAR_ITEM") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, disPatchCart] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    disPatchCart({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    disPatchCart({ type: "REMOVE_ITEM", id });
  }
  function clearItem() {
    disPatchCart({ type: "CLEAR_ITEM" });
  }
  const cartContext = {
    item: cart.items,
    addItem,
    removeItem,
    clearItem
  };
  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
