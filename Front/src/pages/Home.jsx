/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useEcom } from "../context/EcomProvider";
import Loader from "../components/Loader";
import DisplayProduct from "../Components/DisplayProduct";
import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const { product, loading, fetchProduct } = useEcom();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (page > 1) fetchProduct(page);
    else fetchProduct();
  }, [page]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <DisplayProduct product={product} />
      <div className="pagination my-3">
        {product.currentPage > 1 && (
          <Link
            to={`?page=${product.currentPage - 1}`}
            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
            onClick={() => setPage(product.currentPage - 1)}
          >
            Previous
          </Link>
        )}

        {Array.from({ length: product.totalPages }).map((_, index) => {
          return (
            <Link
              key={index}
              to={`?page=${index + 1}`}
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Link>
          );
        })}

        {product.currentPage < product.totalPages && (
          <Link
            to={`?page=${product.currentPage + 1}`}
            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
            onClick={() => setPage(product.currentPage + 1)}
          >
            Next
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
