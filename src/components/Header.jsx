import { NavLink } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";

function Header() {
  const { cart } = useEcom();
  return (
    <header className="flex justify-between px-12 py-2 mb-12 bg-amber-400 ">
      <h1 className="font-bold text-xl">Ecommerce</h1>
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
            <NavLink to="/cart">
              Cart <span>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
