import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";

function SingleProduct() {
  const { id } = useParams();
  const { fetchSingleProduct, fetchCategories } = useEcom();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

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
            <button>Add To Wishlist</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
