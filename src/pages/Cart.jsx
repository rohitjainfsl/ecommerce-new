import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { MdOutlineCurrencyRupee } from "react-icons/md";

export default function Cart() {
  const { cart } = useEcom();
  console.log(cart);
  return (
    <div className="cart flex">
      {cart.length === 0 ? (
        <div className="emptyCart">
          <h2>Nothing to show</h2>
          <p>
            <Link to="/">Go Shopping</Link>
          </p>
        </div>
      ) : (
        <>
          <div className="cartContent">
            {cart.map((item) => {
              return (
                <div key={item.product._id} className="cartItem flex gap-4">
                  <img src={item.product.url} alt={item.product.name} className="w-20 h-20" />
                  <div className="info">
                    <h3>{item.product.name}</h3>
                    <p className="inline-flex">
                      <MdOutlineCurrencyRupee />
                      <span>{item.product.price}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartTotal"></div>
        </>
      )}
    </div>
  );
}
