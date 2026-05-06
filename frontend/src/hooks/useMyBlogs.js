import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { queryKeys } from "../lib/queryClient";

export const useMyBlogs = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.myBlogs(),
    queryFn: async () => {
      const { data } = await api.get("/blog/user/blogs");
      if (Array.isArray(data)) return data;
      return data?.blogs || [];
    },
    enabled,
  });
};

export default useMyBlogs;
