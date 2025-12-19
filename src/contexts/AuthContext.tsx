import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: O'zingizning backend API ga bog'lang
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // O'zingizning API endpointingizga so'rov yuboring
      // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      // const data = await response.json();
      // setUser(data.user);
      console.log("SignIn:", email, password);
      setUser({ id: "1", email });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // O'zingizning API endpointingizga so'rov yuboring
      // const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ email, password }) });
      // const data = await response.json();
      // setUser(data.user);
      console.log("SignUp:", email, password);
      setUser({ id: "1", email });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
