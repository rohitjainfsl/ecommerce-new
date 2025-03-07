/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import DisplayProduct from "../components/DisplayProduct";
import Loader from "../components/Loader";


function ShopByCategory() {
    const { categoryId } = useParams();
  const { filterByCategory, productsByCat, loading } = useEcom();


  // Below useEffect is fetching the product based on the category (ie accessories, Food, mobiles and so on) provided. 
  useEffect(() => {
    if (categoryId) {
      filterByCategory(categoryId);
    }
  }, [categoryId]);
 
  return loading ? <Loader /> : <DisplayProduct product={productsByCat} />;
  
}

export default ShopByCategory