import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useEcom();

  return (
    <div className="cart flex gap-8">
      {cart.length === 0 ? (
        <div className="emptyCart w-full text-center font-bold">
          <h2 className="text-xl">Nothing to show</h2>
          <p>
            <Link to="/" className="underline text-blue-300">
              Go Shopping
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="cartContent w-2/3">
            {cart.map((item) => {
              return (
                <div key={item.product._id} className="cartItem flex gap-4">
                  <img
                    src={item.product.url}
                    alt={item.product.name}
                    className="w-20 h-20"
                  />
                  <div className="info">
                    <h3>{item.product.name}</h3>
                    <p className="inline-flex items-center font-bold">
                      <MdOutlineCurrencyRupee />
                      <span>{item.product.price}</span>
                    </p>

                    <div className="quantityChanger flex items-stretch max-w-40 py-4">
                      {item.quantity === 1 ? (
                        <p
                          className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <MdOutlineDeleteForever />
                        </p>
                      ) : (
                        <p className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center" onClick={()=> updateQuantity(item.product._id, "+")}>
                          -
                        </p>
                      )}
                      <p className="cursor-pointer w-10 border  border-gray-200 bg-gray-100 flex items-center justify-center">
                        {item.quantity}
                      </p>
                      <p className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center" onClick={()=> updateQuantity(item.product._id, "+")}>
                        +
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartTotal w-1/3"></div>
        </>
      )}
    </div>
  );
}
