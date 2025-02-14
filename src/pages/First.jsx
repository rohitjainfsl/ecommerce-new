import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function First() {
  return (
    <>
      <Header />
      <main className="px-12 py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default First;
