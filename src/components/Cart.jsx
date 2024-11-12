import { useContext } from "react";

import CartContext from "../store/CartContext";

import Modal from "../components/Modal.jsx";
import { currencyFormat } from "../util/currencyFormat.js";
import Button from "../components/UI/Button.jsx";
import UserProgressContext from "../store/userProgressCart";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.item.reduce((totalAddItems, item) => {
    return totalAddItems + item.quantity * item.price;
  }, 0);
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleOpenCheckOut() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.item.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormat.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.item.length > 0 && (
          <Button onClick={handleOpenCheckOut}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
