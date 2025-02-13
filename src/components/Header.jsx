import { NavLink } from "react-router-dom";

function Header() {
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
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
