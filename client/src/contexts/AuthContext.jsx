import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
  });

  // UPDATE USER (SYNC STATE + STORAGE)
  const setUser = (newUser) => {
    setUserState(newUser);

    if (newUser?.name) {
      localStorage.setItem("name", newUser.name);
    }

    if (newUser?.email) {
      localStorage.setItem("email", newUser.email);
    }

    if (newUser?.token) {
      localStorage.setItem("token", newUser.token);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();

    setUserState({
      name: null,
      email: null,
      token: null,
    });

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
