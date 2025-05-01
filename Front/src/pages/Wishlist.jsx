import { useEcom } from "../Context/EcomProvider";
import { Link } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";

function Wishlist() {
  const { wishlist } = useEcom(); // this useEcom is nothing but say useContext(ecomContext).

  // console.log("wishlist: ", wishlist);
  return (
    <div className="bg-gray-100 p-6 min-h-[100svh]">
      {wishlist.length === 0 ? (
        <div className="emptyCart">
          <h2>No Items in the wishlist.</h2>
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </div>
      ) : (
        <>
          {wishlist?.map((Item) => {
            // console.log(Item);
            return (
              <div key={Item.product._id} className="">
                <img src={Item.product.image} className="w-[9rem] h-[9rem]" />
                <div>
                  <h3 className="text-2xl mb-2">{Item.product.title}</h3>
                  <p className="flex items-center py-1 font-bold">
                    <MdOutlineCurrencyRupee className="" />
                    <span>{Item.product.OriginalPrice}</span>
                  </p>
                  <div className="flex flex-col">
                    <span>
                      <strong>Brand:- </strong>
                      {Item.product.brand}
                    </span>
                    <span>
                      <strong>Description:- </strong>
                      {Item.product.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Wishlist;
