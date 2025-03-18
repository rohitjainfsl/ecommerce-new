/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";
import instance from "../../axiosConfig";

const AdminEcom = createContext();

function AdminEcomProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);
  const [dealProduct, setDealProduct] = useState([]);
  const [count, setCount] = useState({
    categories: 0,
    orders: 0,
    products: 0,
    users: 0,
  });

  // fetching all Products
  async function fetchProduct(page = null) {
    try {
      setLoading(true);
      const response = await instance.get(`product/get/?page=${page}`, {
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

  async function getCount() {
    try {
      const response = await instance.get("/admin/count", {
        withCredentials: true,
      });
      setCount(response.data.count);
    } catch (error) {
      console.log(error);
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
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  //deleting products & categories
  async function handleDelete(idToDelete, whatToDelete) {
    try {
      const response = await instance.delete(`/product/${idToDelete}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href =
          whatToDelete === "product" ? "/admin/products" : "/admin/categories";
      }
    } catch (error) {
      console.log(error);
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
    const productAlreadyExists = cart.find(
      (cartItem) => cartItem.product._id === id
    );
    return productAlreadyExists ? true : false;
  }

  // function to remove item from cart.
  function removeFromCart(id) {
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
    <AdminEcom.Provider
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
        handleDelete,
        getCount,
        count,
      }}
    >
      {children}
    </AdminEcom.Provider>
  );
}

export function useAdminEcom() {
  return useContext(AdminEcom);
}

export default AdminEcomProvider;
