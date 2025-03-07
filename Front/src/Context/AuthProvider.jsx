/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";

import instance from "../axiosConfig";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
    checkAuthAdmin();
  }, []);

  async function checkAuth() {
    try {
      const response = await instance.get("/auth/check", {
        withCredentials: true,
      });
      if (response.status === 200) setIsUserLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsUserLoggedIn(false);
    }
  }

  async function checkAuthAdmin() {
    try {
      await instance.get("/admin/check", {
        withCredentials: true,
      });
      setIsAdminLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsAdminLoggedIn(false);
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
