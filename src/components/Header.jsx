import { Link, NavLink } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { IoIosCart } from "react-icons/io";
import { useEffect, useState } from "react";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart, categories, fetchCategories, filterByCategory } = useEcom();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header className="flex justify-between items-center px-12 py-2 mb-4 bg-amber-400 ">
      <h1 className="font-bold text-2xl">
        <Link to="/">Ecommerce</Link>
      </h1>
      <nav>
        <ul className="flex items-center gap-4 font-medium text-sm">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="rounded-lg px-3 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Shop By Category
              <svg
                className="w-2.5 h-2.5 ms-3 transition-all duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                style={dropdownOpen ? { transform: "rotate(180deg)" } : {}}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-amber-400"
            >
              <ul
                className="py-2 text-sm text-black dark:text-black"
                aria-labelledby="dropdownDefaultButton"
              >
                {categories.length > 0 &&
                  categories.map((category, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={`/category/${category.category.toLowerCase()}`}
                          className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        >
                          {category.category}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/cart" className="relative">
              <IoIosCart className="inline-block text-xl" />{" "}
              <span className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-4 h-4 text-xs bg-red-500 text-white rounded-full">
                {cart.length}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
