import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";

const ecomcontext = createContext();

function EcomProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await instance.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function addToCart(product) {
    if (existInCart(product._id)) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === product._id
            ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 }
            : cartItem
        )
      );
    } else {
      const obj = { product, quantity: 1 };
      setCart([...cart, obj]);
    }
  }

  function removeFromCart(productId) {
    setCart(cart.filter((cartItem) => cartItem.product._id !== productId));
  }

  function updateQuantity(productId, sign) {
    if (!existInCart(productId)) {
      console.log("Incorrect Id");
    }
    setCart(
      cart.map((cartItem) =>
        cartItem.product._id === productId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + (sign === "+" ? 1 : -1),
            }
          : cartItem
      )
    );
  }

  function existInCart(productId) {
    const productAlreadyExists = cart.find(
      (cartItem) => cartItem.product._id === productId
    );
    return productAlreadyExists ? true : false;
  }

  console.log(cart);

  return (
    <ecomcontext.Provider
      value={{
        products,
        cart,
        loading,
        fetchProducts,
        addToCart,
        removeFromCart,
        existInCart,
        updateQuantity,
      }}
    >
      {children}
    </ecomcontext.Provider>
  );
}

export function useEcom() {
  return useContext(ecomcontext);
}
export default EcomProvider;
