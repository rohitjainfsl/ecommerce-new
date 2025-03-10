import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="min-h-screen flex">
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
