import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useEcom();

  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart.reduce((accumulator, current) => {
          return accumulator + current.product.price * current.quantity;
        }, 0)
      );
    }
  }, [totalPrice, cart]);

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
                <div
                  key={item.product._id}
                  className="cartItem flex gap-4 my-3 px-2 py-2"
                >
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
                        <p
                          className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                          onClick={() => updateQuantity(item.product._id, "-")}
                        >
                          -
                        </p>
                      )}
                      <p className="cursor-pointer w-10 border  border-gray-200 bg-gray-100 flex items-center justify-center">
                        {item.quantity}
                      </p>
                      <p
                        className="cursor-pointer w-5 border  border-amber-400 bg-amber-400 flex items-center justify-center"
                        onClick={() => updateQuantity(item.product._id, "+")}
                      >
                        +
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartTotal w-1/3 max-h-64 bg-amber-100 rounded-lg p-4">
            <h2 className="text-xl font-bold text-center">Order Summary</h2>

            <div className="itemTotalPrice flex justify-between items-center py-1">
              <p>Items:</p>
              <p className="inline-flex items-center">
                <MdOutlineCurrencyRupee /> <span>{totalPrice}</span>
              </p>
            </div>

            <div className="deliveryCharges flex justify-between items-center py-1">
              <p>Delivery:</p>
              <p>--</p>
            </div>

            <div className="spacer py-2 border-b-1 border-gray-400"></div>

            <div className="cartTotal flex justify-between items-center py-1 text-red-500 text-xl font-bold">
              <p>Order Total:</p>
              <p className="inline-flex items-center">
                <MdOutlineCurrencyRupee />{" "}
                <span>{totalPrice + deliveryCharges}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
