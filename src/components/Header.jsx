import { useContext } from "react";

import logoImg from "../assets/logo.jpg";

import Button from "../components/UI/Button";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/userProgressCart";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = cartCtx.item.reduce((totalAddItems, item) => {
    return totalAddItems + item.quantity;
  }, 0);

  return (
    <div className="header">
      <div className="title">
        <img src={logoImg} alt="logo Img" />
        <h2>ReactFood</h2>
      </div>
      <nav>
        <Button textOnly onClick={userProgressCtx.showCart}>
          Cart ({totalItems})
        </Button>
      </nav>
    </div>
  );
}
