import { Link, NavLink } from "react-router-dom";
import { useEcom } from "../Context/EcomProvider";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useAdminAuth } from "../admin/Context/AdminAuthProvider";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart, categories, fetchCategories } = useEcom();
  const { isUserLoggedIn, logout } = useAuth();
  const { isAdminLoggedIn } = useAdminAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header className="flex justify-between bg-amber-200 px-12 py-2">
      <NavLink to="/">
        <div className="font-bold text-xl">Ecommerce</div>
      </NavLink>
      <ul className="flex gap-4">
        <li>
          <NavLink to="/hotDeals">Hot Deals</NavLink>
        </li>

        <li>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="rounded-lg px-3 text-center inline-flex items-center relative cursor-pointer"
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Shop By Category
            <svg
              className="w-2.5 h-2.5 ms-1 mt-1 transition-all duration-300"
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
            className={`z-1 ${
              dropdownOpen ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 shadow-sm w-44 dark:bg-amber-400 absolute mt-3`}
          >
            <ul
              className="py-2 text-sm text-black dark:text-black"
              aria-labelledby="dropdownDefaultButton"
            >
              {categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={`/category/${category.name.toLowerCase()}`}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="block w-full px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
        </li>
        <li>
          {isUserLoggedIn || isAdminLoggedIn ? (
            <Link
              onClick={logout}
              to={isUserLoggedIn ? `/user/login` : `/admin/login`}
            >
              Logout
            </Link>
          ) : (
            <NavLink to="/user/login">Login</NavLink>
          )}
        </li>

        <li>
          <NavLink to="/wishlist">
            <p className="flex items-center">
              Wishlist{" "}
              <span className="px-1">
                <FaHeart />
              </span>
            </p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart">
            <p className="flex relative">
              Cart
              <span className="absolute right-[-14px] top-[-9px] rounded-full bg-red-600 text-white px-[5px] mt-1 text-xs">
                {cart.length > 0 ? cart.length : cart.length}
              </span>
              <FaCartShopping className="text-lg mt-1" />
            </p>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
