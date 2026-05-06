import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { queryKeys } from "../lib/queryClient";

export const useBlog = (id) => {
  return useQuery({
    queryKey: queryKeys.blog(id),
    queryFn: async () => {
      const { data } = await api.get(`/blog/${id}`);
      return data?.blog;
    },
    enabled: Boolean(id),
  });
};

export default useBlog;
