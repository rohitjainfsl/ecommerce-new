import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";

function Home() {
  const { products, loading, fetchProducts } = useEcom();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  return (
    <>
      <div className="flex flex-wrap justify-center gap-16">
        {products.length > 0
          ? products.map((item) => {
              return (
                <div className=" text-center" key={item._id}>
                  <Link to={`/product/${item._id}`}>
                    <img
                      className="w-[15rem] h-[15rem] object-contain"
                      src={item.url}
                    />
                  </Link>
                  <h2 className="text-xl font-medium mt-4">
                    {" "}
                    {item.name.length > 5
                      ? item.name.split(" ").slice(0, 5).join(" ") + "..."
                      : item.name}
                  </h2>
                  <p className="text-2xl my-2">$ {item.price}</p>
                  <button className="capitalize bg-cyan-300 hover:bg-cyan-600 text-black hover:text-white font-bold py-2 px-12 my-2 rounded cursor-pointer transition-all duration-300">
                    Add to wishlist
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default Home;
