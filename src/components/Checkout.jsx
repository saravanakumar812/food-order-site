import { useContext } from "react";

import CartContext from "../store/CartContext";

import Modal from "../components/Modal.jsx";
import { currencyFormat } from "../util/currencyFormat.js";
import Button from "../components/UI/Button.jsx";
import UserProgressContext from "../store/userProgressCart";
import Input from "./Input.jsx";
import useHook from "../hooks/useHook.jsx";
import Error from "./Error";
const requestData = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSendingData,
    error,
    sendRequest,
    clearData
  } = useHook("http://localhost:3000/orders", requestData);

  const totalPrice = cartCtx.item.reduce((totalAddItems, item) => {
    return totalAddItems + item.quantity * item.price;
  }, 0);

  function handleCloseCheckOut() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearItem();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.item,
          customer: customerData
        }
      })
    );
  }
  let actionsData = (
    <>
      <Button textOnly onClick={handleCloseCheckOut}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );
  if (isSendingData) {
    actionsData = <span>Sending Your Data.....</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "CheckOut"}
        onClose={handleCloseCheckOut}
      >
        <h2>Success</h2>
        <p> your Order Submitted SuccessFully </p>
        <p>
          We will Get back to you with More details via email with in the next
          few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "CheckOut"}
      onClose={handleCloseCheckOut}
    >
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount : {currencyFormat.format(totalPrice)}</p>
        <Input id="name" type="text" label="Full Name" />
        <Input id="email" type="email" label="E-Mail Address" />
        <Input id="street" type="text" label="Street" />
        <div className="control-row">
          <Input id="postal-code" type="text" label="Postal-Code" />
          <Input id="city" type="text" label="City" />
        </div>
        {error && (
          <Error title="Fetching Details is not Found" message={error} />
        )}
        <p className="modal-actions">{actionsData}</p>
      </form>
    </Modal>
  );
}
