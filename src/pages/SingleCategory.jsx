import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import DisplayProduct from "../components/DisplayProduct";
import Loader from "../components/Loader";

function SingleCategory() {
  const { id } = useParams();
  const { filterByCategory, productsByCat, loading } = useEcom();

  useEffect(() => {
    if (id) {
      filterByCategory(id);
    }
  }, []);

  return loading ? <Loader /> : <DisplayProduct products={productsByCat} />;
}

export default SingleCategory;
