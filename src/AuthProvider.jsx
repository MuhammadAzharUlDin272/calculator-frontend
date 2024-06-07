import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userid") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [userType, setuserType] = useState(localStorage.getItem("usertype") || "");
  const navigate = useNavigate();

  useEffect(() => { }, [user, token, userType])

  const loginAction = async (data) => {
    try {
      const response = await fetch("https://homecalculatorbackend-ni04.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.userId && res.token) {
        setUser(res.userId);
        setToken(res.token);
        setuserType(res.userType);
        localStorage.setItem("site", res.token);
        localStorage.setItem("userid", res.userId);
        localStorage.setItem("usertype", res.userType);

        // Navigate based on user type
        if (res.userType === "company") {
          navigate("/dashboard");
        } else if (res.userType === "user") {
          navigate("/tender");
        }
        return;
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      alert("Error logging in: " + err.message);  // It's a good practice to give user feedback
    }
  };

  const logOut = () => {
    localStorage.removeItem("usertype");
    localStorage.removeItem("site");
    localStorage.removeItem("userid");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, userType, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
