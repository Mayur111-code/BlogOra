import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "https://blogora-q83s.onrender.com";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([]);

  const fetchUserProfile = async (storedToken) => {
    try {
      const res = await axios.get(`${url}/user/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log("Sync Error:", error.response?.data?.message || error.message);

      if (error.response && (error.response.status === 401 || error.response.status === 402)) {
        logoutUser();
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      
      try {
        const res = await axios.get(`${url}/blog/all`);
        setBlogData(res.data.blogs);
      } catch (error) {
        console.log("Blog fetch error:", error);
      }

      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser)); 
          } catch (e) {
            console.error("User parse error");
          }
        }
       
        await fetchUserProfile(storedToken);
      }
    }
    loadData();
  }, []);

  const loginUser = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextValue = { 
    url, 
    token, 
    blogData, 
    user, 
    setUser, 
    loginUser, 
    logoutUser 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;