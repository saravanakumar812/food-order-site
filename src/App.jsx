import "./App.css";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CheckOut from "./components/Checkout";
import { CartContextProvider } from "./store/CartContext";
import { UserContextProvider } from "./store/userProgressCart";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
