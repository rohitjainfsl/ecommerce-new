import { Link } from "react-router-dom";

function AdminHome() {
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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-xl font-bold">10</p>
            <div className="flex gap-4">
              <Link to="/admin/products">View Products</Link>
              <Link to="/admin/addProduct">Add Product</Link>
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-xl font-bold">5</p>
            <div className="flex gap-4">
              <Link to="">View Orders</Link>
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Categories</h2>
            <p className="text-xl font-bold">3</p>
            <div className="flex gap-4">
              <Link to="">View Categories</Link>
              <Link to="/admin/addCategory">Add Category</Link>
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-xl font-bold">2</p>
            <div className="flex gap-4">
              <Link to="">View Users</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
