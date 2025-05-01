import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";
import { useAuth } from "../Context/AuthProvider";
import { FaRupeeSign } from "react-icons/fa";

function SingleProduct() {
  const { id } = useParams();
  const { fetchSingleProduct, fetchCategories, addToWishlist, addToCart } =
    useEcom();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  const { isUserLoggedIn, loggedInUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    const product = await fetchSingleProduct(id);
    setSingleProduct(product);
    const categories = await fetchCategories();
    setCategories(categories);
    setLoading(false);
  }

  useEffect(() => {
    if (categories?.category && singleProduct?.category) {
      const category = categories.category.find(
        (obj) => obj._id === singleProduct.category
      );
      setCategoryName(category ? category.name : "Unknown");
    }
  }, [singleProduct, categories]);

  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(singleProduct.slug)
      : (window.location.href =
          "/user/login?referer=/product/" + singleProduct.slug);
  }

  function handleAddToCart() {
    isUserLoggedIn
      ? addToCart(singleProduct)
      : (window.location.href =
          "/user/login?referer=/product/" + singleProduct.slug);
  }

  if (loading) return <Loader />;

  return (
    <>
      {singleProduct && (
        <div className="single-product-container flex flex-wrap md:flex-nowrap justify-center items-start min-h-screen bg-gray-100 p-6">
          <div className="left product-image w-full md:w-1/2 flex justify-center items-center p-4">
            <img
              className="w-full max-w-lg rounded-2xl"
              src={singleProduct.image}
              alt={singleProduct.title}
            />
          </div>
          <div className="right product-details w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">{singleProduct.title}</h2>
            <ul className="text-gray-600 mb-4">
              <li>
                <strong>Brand:</strong> {singleProduct.brand}
              </li>
              <li>
                <strong>Category:</strong> {categoryName}
              </li>
            </ul>

            <p className="text-gray-700 mb-4">{singleProduct.description}</p>

            <p className="text-2xl font-bold text-green-600 mb-6 flex items-center">
              <FaRupeeSign className="inline-block" />{" "}
              {singleProduct.discountedPrice}
              {singleProduct.OriginalPrice && (
                <small className="line-through text-xs text-gray-500 ml-2">
                  {singleProduct.OriginalPrice}
                </small>
              )}
            </p>

            <div className="buttons flex gap-4">
              <button
                className="px-4 py-2 border-2 border-green-400 bg-green-400 text-white rounded-2xl hover:bg-green-500"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <Link
                className="px-4 py-2 border-2 border-pink-400 bg-pink-400 text-white rounded-2xl hover:bg-pink-500"
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
