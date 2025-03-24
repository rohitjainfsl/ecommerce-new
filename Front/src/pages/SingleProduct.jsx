import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";
import { useAuth } from "../Context/AuthProvider";

function SingleProduct() {
  const { id } = useParams();
  const { fetchSingleProduct, fetchCategories, addToWishlist } = useEcom();
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
    setCategoryName(
      categories?.category?.find((obj) => obj._id === singleProduct.category)
        .name
    );
  }, [singleProduct, categories]);

  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(singleProduct.slug)
      : (window.location.href =
          "/user/login?referer=/product/" + singleProduct.slug);
  }

  if (loading) return <Loader />;

  return (
    <>
      {singleProduct && (
        <div>
          <div className="left">
            <img src={singleProduct.image} alt={singleProduct.title} />
          </div>
          <div className="right">
            <h2>{singleProduct.title}</h2>
            <p>
              <strong>Brand: </strong>
              {singleProduct.brand}
            </p>
            <p>
              <strong>Category: </strong>
              {categoryName}
            </p>
            <p>{singleProduct.description}</p>

            <button>Add To Cart</button>
            <Link
              className="rounded px-2 py-1 bg-blue-400 text-white"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
