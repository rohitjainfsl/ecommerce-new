/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";

import instance from "../axiosConfig";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedInAdmin, setLoggedInAdmin] = useState({});

  useEffect(() => {
    checkAuth();
    checkAuthAdmin();
  }, []);

  async function checkAuth() {
    try {
      const response = await instance.get("/auth/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setLoggedInUser(response.user);
      }
    } catch (error) {
      console.log(error);
      setIsUserLoggedIn(false);
      setLoggedInUser({});
    }
  }

  async function checkAuthAdmin() {
    try {
      const response = await instance.get("/admin/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        setLoggedInAdmin(response.admin);
      }
    } catch (error) {
      console.log(error);
      setIsAdminLoggedIn(false);
      setLoggedInAdmin({});
    }
  }

  async function logout() {
    try {
      if (isUserLoggedIn) {
        await instance.post(
          "/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
        setIsUserLoggedIn(false);
        checkAuth();
      } else {
        await instance.post(
          "/admin/logout",
          {},
          {
            withCredentials: true,
          }
        );
        setIsAdminLoggedIn(false);
        checkAuthAdmin();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        logout,
        checkAuth,
        isAdminLoggedIn,
        checkAuthAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
