import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import SingleCategory from "./pages/SingleCategory";
import EcomProvider from "./context/EcomProvider";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/category/:id",
        element: <SingleCategory />,
      },
    ],
  },
]);

function App() {
  return (
    <EcomProvider>
      <RouterProvider router={router} />
    </EcomProvider>
  );
}

export default App;
