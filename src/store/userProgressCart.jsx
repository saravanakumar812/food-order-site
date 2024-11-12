import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

export function UserContextProvider({ children }) {
  const [userProgress, SetUserProgress] = useState();
  function showCart() {
    SetUserProgress("cart");
  }
  function hideCart() {
    SetUserProgress("");
  }

  function showCheckout() {
    SetUserProgress("CheckOut");
  }
  function hideCheckout() {
    SetUserProgress("");
  }
  const userProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };
  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;
