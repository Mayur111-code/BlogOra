import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api, { BASE_URL, setUnauthorizedHandler } from "../api/api";
import { queryKeys } from "../lib/queryClient";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = BASE_URL;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const blogsQuery = useQuery({
    queryKey: queryKeys.blogs(),
    queryFn: async () => {
      const { data } = await api.get("/blog/all");
      return data?.blogs || [];
    },
  });

  useQuery({
    queryKey: queryKeys.profile(),
    enabled: Boolean(token),
    queryFn: async () => {
      const { data } = await api.get("/user/profile");
      if (data?.success && data?.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return data.user;
      }
      return null;
    },
  });

  const loginUser = useCallback((userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }, []);

  const logoutUser = useCallback(() => {
    setToken("");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: queryKeys.profile() });
  }, [queryClient]);

  useEffect(() => {
    setUnauthorizedHandler((status) => {
      if (!token) return;
      logoutUser();
      if (status === 401 || status === 402) {
        toast.error("Session expired, please login again");
        navigate("/login", { replace: true });
      }
    });
    return () => setUnauthorizedHandler(null);
  }, [token, logoutUser, navigate]);

  const blogData = useMemo(
    () => (Array.isArray(blogsQuery.data) ? blogsQuery.data : []),
    [blogsQuery.data]
  );

  const contextValue = useMemo(
    () => ({
      url,
      token,
      user,
      setUser,
      loginUser,
      logoutUser,
      blogData,
      blogsLoading: blogsQuery.isLoading,
      blogsError: blogsQuery.error,
      refetchBlogs: blogsQuery.refetch,
    }),
    [
      url,
      token,
      user,
      loginUser,
      logoutUser,
      blogData,
      blogsQuery.isLoading,
      blogsQuery.error,
      blogsQuery.refetch,
    ]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
