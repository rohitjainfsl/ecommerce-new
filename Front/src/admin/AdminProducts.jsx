import { Link } from "react-router-dom";
import { useEcom } from "../Context/EcomProvider";
import { useEffect, useState } from "react";

function AdminProducts() {
  const { product, fetchProduct } = useEcom();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) fetchProduct(page);
    else fetchProduct();
  }, [page]);

  return (
    <div className="min-h-screen flex items-stretch">
      <aside className="w-1/5 p-4 bg-gray-200 min-h-fit">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-4 sticky top-0">
          <li>
            <Link to="/admin/home" className="py-3 w-full inline-block">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="py-3 w-full inline-block">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="py-3 w-full inline-block">
              Products
            </Link>
          </li>
          <li>
            <Link to="" className="py-3 w-full inline-block">
              Orders
            </Link>
          </li>
          <li>
            <Link to="" className="py-3 w-full inline-block">
              Users
            </Link>
          </li>
        </ul>
      </aside>
      <main className="w-4/5 p-4">
        <h2 className="text-2xl font-bold mb-3">Products</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Original Price</th>
              <th className="p-2">Discounted Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {product?.products?.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className={`mb-2 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  <td className="p-2">
                    <img
                      src={item.image}
                      className="w-20 h-20 object-contain"
                      alt=""
                    />
                    <p>{item.title}</p>
                  </td>
                  <td className="p-2">{item.OriginalPrice}</td>
                  <td className="p-2">{item.discountedPrice}</td>
                  <td className="p-2">{item.category.name}</td>
                  <td className="p-2">
                    <button className="bg-red-500 text-white p-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
      </main>
    </div>
  );
}

export default AdminProducts;
