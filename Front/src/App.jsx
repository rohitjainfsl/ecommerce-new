import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ShopByCategory from "./pages/ShopByCategory";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HotDeals from "./Components/HotDeals";
import EcomProvider from "./context/EcomProvider";
import AuthProvider from "./Context/AuthProvider";
import ProtectedRoute from "./Context/ProtectedRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart fallback="user/login" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:categoryId",
        element: <ShopByCategory />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/hotDeals",
        element: <HotDeals />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/admin/AddProduct",
        element: (
          <ProtectedRoute>
            <AddProduct fallback="admin/login" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/home",
        element: (
          <ProtectedRoute>
            <AdminHome fallback="admin/login" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/AddCategory",
        element: (
          <ProtectedRoute>
            <AddCategory fallback="admin/login" />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <EcomProvider>
          <RouterProvider router={router} />
        </EcomProvider>
      </AuthProvider>
    </>
  );
}

export default App;
