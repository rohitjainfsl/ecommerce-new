/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";
const ecomContext = createContext();

function EcomProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dealProduct, setDealProduct] = useState([]);

  // fetching all Products
  async function fetchProduct(page = null) {
    try {
      setLoading(true);
      const response = await instance.get(
        page ? `product/get/?page=${page}` : `product/get`,
        {
          withCredentials: true,
        }
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSingleProduct(id) {
    try {
      setLoading(true);
      const response = await instance.get(`/product/get/${id}`);
      // setSingleProduct(response.data.products[0]);
      return response.data.products[0];
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
      const response = await instance.get("/product/category");
      // setCategories(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // filtering category
  async function filterByCategory(category, isName = false) {
    try {
      setLoading(true);
      const url = isName
        ? "/product/get/?categoryName="
        : "/product/get/?category=";
      const response = await instance.get(url + category);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWishlist() {
    try {
      const response = await instance.get("/user/getWishlist", {
        withCredentials: true,
      });
      const wishlistData = response.data.wishlist;
      const populatedWishlist = await Promise.all(
        wishlistData.map(async (productId) => {
          const productResponse = await instance.get(`/product/get/${productId}`);
          return { product: productResponse.data.products[0] };
        })
      );
      setWishlist(populatedWishlist);
    } catch (error) {
      console.log(error);
    }
  }

  // addtowishlist function
  async function addToWishlist(productSlug) {
    try {
      if (await existInWishlist(productSlug)) {
        alert("Already exist in wishlist");
      } else {
        const response = await instance.post(
          "/user/addToWishlist",
          { productSlug },
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data);
          setWishlist([...wishlist, response.data.wishlist]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to check whether product is there in the wishlist or not.
  async function existInWishlist(slug) {
    const response = await instance.get(`/user/checkInWishlist/${slug}`, {
      withCredentials: true,
    });
    // console.log(response.data.exists);
    return response.data.exists ? true : false;
  }

  // function to remove item from wishlist.
  function removeFromWishlist(id) {
    setWishlist(wishlist.filter((item) => item.product._id !== id));
  }

  // Add to Cart function
  function addToCart(product) {
    const existingCartItem = cart.find((item) => item.product._id === product._id);
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  }

  // Remove from Cart function
  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.product._id !== productId));
  }

  // Update Quantity function
  function updateQuantity(productId, action) {
    setCart(
      cart.map((item) =>
        item.product._id === productId
          ? {
              ...item,
              quantity: action === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
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
        dealProduct,
        fetchProduct,
        addToCart,
        removeFromCart,
        
        updateQuantity,
        addToWishlist,
        existInWishlist,
        removeFromWishlist,
        fetchCategories,
        filterByCategory,
        fetchHotDeals,
        fetchSingleProduct,
        fetchWishlist,
      }}
    >
      {children}
    </ecomContext.Provider>
  );
}

export function useEcom() {
  return useContext(ecomContext);
}

export default EcomProvider;
