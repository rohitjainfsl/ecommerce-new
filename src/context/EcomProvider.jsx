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
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function addToCart(product) {
    // const productAlreadyExists = cart.find(
    //   (cartItem) => cartItem._id === product._id
    // );

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

  function removeFromCart(product) {
    setCart(cart.filter((cartItem) => cartItem.product._id !== product._id));
  }

  function existInCart(productId) {
    const productAlreadyExists = cart.find(
      (cartItem) => cartItem.product._id === productId
    );
    console.log(productAlreadyExists);
    return productAlreadyExists ? true : false;
  }

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
