import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";

 export const ecomcontext = createContext();

function EcomProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await instance.get("/product");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ecomcontext.Provider value={{ products, cart, loading, fetchProducts }}>
      {children}
    </ecomcontext.Provider>
  );
}
// export function useEcom() {
//   return useContext(ecomcontext);
// }
export default EcomProvider;
