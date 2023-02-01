import { createContext, useContext, ReactNode, useState } from "react";
import { UseLocalStorage } from "../hooks/useLocalStorage";

// define types of our context and provider
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextProps = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
};

type CartItem = {
  id: number;
  quantity: number;
};
/* ------------------------------------------------------------------------ */

// create context which will be our shopping cart context
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// create custom hook which will be our use shopping cart and give that our shopping cart context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

/* function which will be provided in app and can access all our page and component. we create here functions for item quantity
to increase, decrease and remove items from cart, give our items quantity to cart and
than we give them as value to our provider. then every component or page can access these functions */
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = UseLocalStorage<CartItem[]>('shopping cart', []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  /* ------ functions for increase, decrease, remove items in cart ------- */
  /* in this function we access tha quantity of cart items. if in cart items [] we can find 
    item which id matches our item's id (we give this id in page or component from our data's id)
    then we can get item quantity or if these ids doesn't match then default value of quantity is 0 */
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  /* in this function we increase items quantity in cart. first if we can find item in curr items [],
    that matches our data's id, but quantity is null then we give id quantity of one.
    second if item id and our data's id matches and we have quantity, we also add 1 to item quantity.
    if curr items[] item.id and our data's id doesn't match we simply return only item */
  function increaseItemQuantity(id: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id) == null) {
        return [...curItems, { id, quantity: 1 }];
      } else {
        return curItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  /* in this function we decrease quantity of items in cart. first if we can find item in currItem[],
  which matches our data[]'s id and their quantity is 1, we simply remove it by filtering currItem[]
  and saying that item's id doesn't match our data[]'s id.
  second logic is similar to increase items logic, only we don't add quantiy, we substract one from quantity*/
  function decreaseItemQuantity(id: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id)?.quantity === 1) {
        return curItems.filter((item) => item.id !== id);
      } else {
        return curItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  /* in this function we remove item from cart. we just say that in current Items [], item id
  and our data[]'s id doesn't match and it will be removed */
  function removeItem(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== id);
    });
  }
  /* ------- end of functions for increase, decrease, remove items in cart */

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
