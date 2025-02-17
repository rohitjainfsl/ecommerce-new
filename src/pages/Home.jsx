import { useEffect } from "react";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";
import DisplayProduct from "../components/DisplayProduct";

function Home() {
  const { products, loading, fetchProducts } = useEcom();

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? <Loader /> : <DisplayProduct products={products} />;
}

export default Home;
