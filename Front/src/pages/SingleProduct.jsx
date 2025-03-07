/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useParams } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useEcom } from "../context/EcomProvider";
import Loader from "../Components/Loader";
import DisplayProduct from "../Components/DisplayProduct";
import { useAuth } from "../Context/AuthProvider";
import {useNavigate} from "react-router-dom"
function SingleProduct() {
  const navigate=useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const {
    addToCart,
    removeFromCart,
    existInCart,
    existInWishlist,
    removeFromWishlist,
    addToWishlist,
    filterByCategory,
    productsByCat,
    categories,
  } = useEcom();

const {isUserLoggedIn}=useAuth();

  let { id } = useParams(); // It retrieves the 'id' parameter from the URL.

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    if (product.category) {
      setCategoryName(
        categories.find((obj) => {
          return obj._id === product.category;
        }).name
      );
    }
  }, [id, product.category]);

  useEffect(() => {
    filterByCategory(categoryName);
  }, [categoryName]);

  async function fetchProduct(id) {
    try {
      setLoading(true);
      // const response = await axios.get(`https://ecommerce-api-8ga2.onrender.com/api/product/${id}`);
      const response = await instance.get(`/product/get/${id}`);
      setProduct(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
// console.log(window.location.href)
function userCartAuthentication(){
  if(isUserLoggedIn){
    addToCart(product)
  }
  else{
    navigate("/user/login/?referer="+window.location.href)
  }
}








  if (loading) return <Loader />;

  return (
    <>
      <div className="product flex gap-8 px-12 py-4">
        <div className="left w-1/4">
          <img
            src={product.image}
            className="w-[15rem] h-[15rem] object-contain"
          />
        </div>
        <div className="right w-3/4 mt-3">
          <h2 className="text-3xl font-bold py-4">{product.title}</h2>

          <div className="flex items-center  leading-none">
            <span className="text-lg font-medium">
              <MdOutlineCurrencyRupee />
            </span>
            <span className="text-xl font-bold">{product.OriginalPrice}</span>
          </div>
          <h2 className="my-2">
            <strong>Brand:- </strong> {product.brand}
          </h2>
          <h2>
            <strong>Category:- </strong> {categoryName}
          </h2>
          <h2 className="flex my-2">
            <strong className='pr-1'>Description:-</strong> {product.description}
          </h2>

          <div className="my-3 flex gap-2">
            {existInWishlist(product._id) ? (
              <button
                className="bg-red-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove From Wishlist
              </button>
            ) : (
              <button
                className="bg-amber-300 text-black  px-2 py-1 font-bold cursor-pointer rounded"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            )}
            {existInCart(product._id) ? (
              <button
                className="bg-red-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                onClick={() => removeFromCart(product._id)}
              >
                Remove From Cart
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white  px-3 py-1 font-bold cursor-pointer rounded"
                onClick={userCartAuthentication}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='text-center'>
        <h1 className="text-2xl mb-3 bg-green-300">Similar Products</h1>
       {(loading)? <Loader />:
        <DisplayProduct
          product={productsByCat.filter((item) => item._id !== product._id)}
        />} 

      </div>
    </>
  );
}

export default SingleProduct;
