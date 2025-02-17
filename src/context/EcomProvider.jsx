import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";

const ecomcontext = createContext();

function EcomProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);
  const [categories, setCategories] = useState([]);
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

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await instance.get("/product/categories/all");
      setCategories(response.data);
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

  async function filterByCategory(category) {
    try {
      setLoading(true);
      setProductsByCat([]);
      const response = await instance.get("/product/?category=" + category);
      setProductsByCat(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ecomcontext.Provider
      value={{
        products,
        categories,
        cart,
        loading,
        fetchProducts,
        fetchCategories,
        addToCart,
        removeFromCart,
        existInCart,
        updateQuantity,
        filterByCategory,
        productsByCat,
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
