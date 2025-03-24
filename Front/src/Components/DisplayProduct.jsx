/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";

function DisplayProduct({ product }) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-16 pt-8 pb-10">
        {product?.products?.length > 0
          ? product?.products?.map((item) => {
              return (
                <div key={item._id} className="text-center">
                  <Link
                    to={
                      item.slug
                        ? `/product/${item.slug}`
                        : `/product/${item._id}`
                    }
                  >
                    <img
                      src={item.image}
                      className="w-[14rem] h-[14rem] object-contain"
                    />
                  </Link>
                  <h2 className="my-2">
                    <span className="px-2 font-bold">{item.brand}</span>
                    {item.title.length > 5
                      ? item.title.split(" ").slice(0, 5).join(" ") + "..."
                      : item.title}
                  </h2>
                  <div className="my-2 flex items-center justify-center leading-none">
                    <p className="inline-flex items-center me-1">
                      <MdOutlineCurrencyRupee className="text-sm" />
                      <strong className="">{item.discountedPrice}</strong>
                    </p>
                    <span className="text-xs text-red-500 inline-flex items-center line-through">
                      {item.OriginalPrice}
                    </span>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default DisplayProduct;
