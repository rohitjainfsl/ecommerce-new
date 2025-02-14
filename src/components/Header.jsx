import { Link, NavLink } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { IoIosCart } from "react-icons/io";

function Header() {
  const { cart } = useEcom();
  return (
    <header className="flex justify-between items-center px-12 py-2 mb-4 bg-amber-400 ">
      <h1 className="font-bold text-2xl">
        <Link to="/">Ecommerce</Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="relative">
              <IoIosCart className="inline-block text-xl" /> <span className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-4 h-4 text-xs bg-red-500 text-white rounded-full">{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
