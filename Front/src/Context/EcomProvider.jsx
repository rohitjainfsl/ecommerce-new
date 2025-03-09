/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react"; // create and use context are react hooks used to manage and consume context.
// It is an api fetching tool used to make http requests.
import instance from "../axiosConfig";
// import axios from "axios"

// Context in react is made to solve the problem of prop drilling and to provide shared state or functions to multiple components.
// Context creates a central state (like a global store) that any component can access.

const ecomContext = createContext(); // created a context called ecomContext which  will be used to share state and functions across the app without passing props manually.

function EcomProvider({ children }) {
  // when any setstate (ex setCart, setWishlist and so on) is called , React re-renders any components that consume the (cart, wishlist) state (via the useEcom hook. )

  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);
  const [dealProduct, setDealProduct] = useState([]);

  // fetching all Products
  async function fetchProduct() {
    try {
      setLoading(true);
      // const response = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product`);
      const response = await instance.get(`/product/get`, {
        withCredentials: true,
      });
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHotDeals() {
    try {
      const response = await instance.get("/deals", { withCredentials: true });
      setDealProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // fetching all categories
  async function fetchCategories() {
    try {
      setLoading(true);
      // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/categories/all");
      const response = await instance.get("/product/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // filtering category
  async function filterByCategory(category) {
    try {
      setLoading(true);
      // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/?category=" + category);
      const response = await instance.get("/product/get/?category=" + category);
      console.log(response.data);
      setProductsByCat(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // addtowishlist function
  function addToWishlist(product) {
    if (existInWishlist(product._id)) {
      alert("Already exist in wishlist");
    } else {
      const obj = { product };
      setWishlist([...wishlist, obj]);
    }
  }

  // function to check whether product is there in the wishlist or not.
  function existInWishlist(id) {
    const productAlreadyExists = wishlist.find(
      (wishlistItem) => wishlistItem.product._id === id
    );
    return productAlreadyExists ? true : false;
  }

  // function to remove item from wishlist.
  function removeFromWishlist(id) {
    setWishlist(wishlist.filter((item) => item.product._id !== id));
  }

  // addToCart function
  function addToCart(product) {
    
    if (existInCart(product._id)) {
      // If the product is already in the cart, updates it quantity.
      setCart(
        cart.map((cartItem) =>
          cartItem.product._id === product._id
            ? { ...cartItem, quantity: Number(cartItem.quantity) }
            : cartItem
        )
      );
      // If the product is not in the cart, add it with the quantity 1.
    } else {
      const obj = { product, quantity: 1 };
      setCart([...cart, obj]);
    }
  }

  // function to check whether product is there in the cart or not.
  function existInCart(id) {
    // find () searches the array to find the first product that matches with the given id.
    const productAlreadyExists = cart.find(
      (cartItem) => cartItem.product._id === id
    );
    return productAlreadyExists ? true : false;
  }

  // function to remove item from cart.
  function removeFromCart(id) {
    // filter function returns all those product whose id is not equal to given id in form of an array.
    setCart(cart.filter((item) => item.product._id !== id));
  }

  // function to update the quantity of the product.
  function updateQuantity(productId, sign) {
    if (!existInCart(productId)) {
      alert("Incorrect Id");
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

  return (
    <ecomContext.Provider
      // below is the shared state and functions
      value={{
        product,
        cart,
        loading,
        wishlist,
        categories,
        productsByCat,
        dealProduct,
        fetchProduct,
        addToCart,
        removeFromCart,
        existInCart,
        updateQuantity,
        addToWishlist,
        existInWishlist,
        removeFromWishlist,
        fetchCategories,
        filterByCategory,
        fetchHotDeals,
      }}
    >
      {/* Below children represents <RouterProvider router={router} />  means every component rendered by RouterProvider (eg: First, Home, wishlist and so on) 
  will have access to all the shared state and functions provided by EcomProvider. 

  children is a critical part of EcomProvider as it ensures all child components can access the global state and functions managed by EcomProvider. 
  
  If we remove {children} none of the components would be rendered and our app will be blank. 
  */}
      {children}
    </ecomContext.Provider>
  );
}

export function useEcom() {
  return useContext(ecomContext);
}

export default EcomProvider;
