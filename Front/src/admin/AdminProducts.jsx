import { Link } from "react-router-dom";
import { useEcom } from "../Context/EcomProvider";
import { useEffect } from "react";

function AdminProducts() {
  const { product, fetchProduct } = useEcom();

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(product);

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/5 p-4 bg-gray-200 rounded h-screen">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-4">
          <li className="py-2">
            <Link to="/admin/home">Dashboard</Link>
          </li>
          <li className="py-2">
            <Link to="">Products</Link>
          </li>
          <li className="py-2">
            <Link to="">Orders</Link>
          </li>
          <li className="py-2">
            <Link to="">Users</Link>
          </li>
        </ul>
      </aside>
      <main className="w-4/5 p-4">
        <h2>Products</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.OriginalPrice}</td>
                  <td>{item.discountedPrice}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="bg-red-500 text-white p-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminProducts;
