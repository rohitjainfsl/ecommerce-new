import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useAuth } from "../Context/AuthProvider";

function AdminLogin() {
  const navigate = useNavigate();
  const { checkAuthAdmin } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.post("/admin/login", data, {
        withCredentials: true,
      });
      checkAuthAdmin();
      if (
        response.status === 200 &&
        response.data.message === "Login Successfull"
      ) {
        navigate("/admin/addProduct");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default AdminLogin;
