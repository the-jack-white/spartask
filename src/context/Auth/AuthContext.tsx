import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContextType, User } from "../ContextTypes";
import { generateAuthToken } from "../../utils/auth";
import { saveToLocalStorage } from "../../utils/utils";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const token = (await generateAuthToken(password)) as string;
    const id = email + password;

    const newUser = {
      id,
      createdAt: Date.now(),
      email,
      token,
    };

    setCurrentUser(newUser);
    saveToLocalStorage("user", newUser);
  };

  const logout = () => {
    setCurrentUser(null);
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
