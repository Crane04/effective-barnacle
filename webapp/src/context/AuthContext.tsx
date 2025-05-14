import React, { createContext, useContext, useState, useEffect } from "react";
import postRequest from "../api/postRequest";
import getRequest from "../api/getRequest";

type AuthContextType = {
  user: any;
  token: string | null;
  signIn: (credentials: { email: string; password: string }) => Promise<any>;
  signUp: (data: any) => Promise<any>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access")
  );

  useEffect(() => {
    if (token) {
      // optionally fetch user data
      getRequest("/accounts/online")
        .then((res) => setUser(res))
        .catch(() => signOut());
    }
  }, [token]);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await postRequest("/accounts/login/", { email, password });
    console.log(res);
    return res;
  };

  const signUp = async (data: any) => {
    localStorage.clear();
    const res = await postRequest("/accounts/signup/", data);
    console.log(res);
    return res;
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
