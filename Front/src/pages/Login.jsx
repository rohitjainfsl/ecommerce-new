import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useAuth } from "../Context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

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
      const response = await instance.post("/user/login", data, {
        withCredentials: true,
      });
      checkAuth();
      if (
        response.status === 200 &&
        response.data.message === "Login Successfull"
      ) {
        // URLSearchParams is used to fetch the URL of the current location of the window.
        const searchParams = new URLSearchParams(window.location.search);
        const URLParam = searchParams.get("referer");
        if (URLParam!== "") {
          window.location.href = URLParam;
        } else {
          navigate("/");
        }
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
      <p>
        New user? <Link to="/user/register">Register</Link>
      </p>
    </>
  );
}

export default Login;
