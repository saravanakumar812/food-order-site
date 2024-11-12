/* eslint-disable react/prop-types */
import { useContext } from "react";
import { currencyFormat } from "../util/currencyFormat.js";
import Button from "../components/UI/Button.jsx";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddItem() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h2>{meal.name}</h2>
        <div>
          <p className="meal-item-price">{currencyFormat.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
