import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useParams } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useEcom } from "../context/EcomProvider";

function SingleProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { addToCart } = useEcom();

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  async function fetchSingleProduct(id) {
    try {
      setLoading(true);
      const response = await instance.get(`/product/${id}`);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {}

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <div className="product flex gap-8 px-12 py-4">
        <div className="left w-1/4">
          <img src={product.url} alt={product.name} />
        </div>
        <div className="right w-3/4">
          <h2 className="text-3xl font-bold">{product.name}</h2>

          {product.ratings && product.ratings.length > 0 ? (
            <div className="ratings flex">
              <p>{product.totalRating}</p>
              <p>{product.ratings.length} ratings</p>
            </div>
          ) : (
            ""
          )}

          <div className="price flex items-center">
            <MdOutlineCurrencyRupee /> <span>{product.price}</span>
          </div>
          <h2>
            {" "}
            <strong>Brand:-</strong> {product.brand}
          </h2>
          <h2>
            {" "}
            <strong>Category:- </strong> {product.category}{" "}
          </h2>
          <div className="flex">
            <strong>Description:- </strong>
            <p>{product.description}</p>
          </div>

          <div className=" ">
            <button className="border-2 bg-green-300 text-white  px-3 py-1 font-bold cursor-pointer transition-all duration-300  hover:bg-rose-600 ">
              Add to wishlist
            </button>
            <button
              className="border-2 bg-cyan-500 text-white  px-3 py-1 font-bold cursor-pointer transition-all duration-300  hover:bg-rose-600 "
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
