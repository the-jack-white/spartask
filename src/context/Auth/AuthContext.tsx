import { ReactNode, createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

import { AuthContextType, User, ValidateFakeRequest } from "../ContextTypes";
import {
  simulateFakeRequest,
  saveToLocalStorage,
  simulateFakeRequestValidation,
} from "../../utils";

const authContextDefaultValues: AuthContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setCookie] = useCookies(["isAuthenticated"]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Call API to get a authToken
    const fakeToken = (await simulateFakeRequest()) as string;

    // Call second API to validate AuthToken
    const { token, isAuthenticated } = (await simulateFakeRequestValidation(
      fakeToken
    )) as ValidateFakeRequest;

    const id = email + password;

    const newUser = {
      id,
      createdAt: Date.now(),
      email,
      token,
    };

    setCurrentUser(newUser);
    setCookie("isAuthenticated", isAuthenticated);
    saveToLocalStorage("user", newUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setCookie("isAuthenticated", false);
    saveToLocalStorage("user", null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
