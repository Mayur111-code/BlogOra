import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { queryKeys } from "../lib/queryClient";

const fetchBlogs = async ({ queryKey }) => {
  const [, params] = queryKey;
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.category && params.category !== "All")
    search.set("category", params.category);
  if (params?.q) search.set("q", params.q);

  const qs = search.toString();
  const { data } = await api.get(`/blog/all${qs ? `?${qs}` : ""}`);
  return data;
};

export const useBlogs = (params) => {
  return useQuery({
    queryKey: queryKeys.blogs(params),
    queryFn: fetchBlogs,
    select: (data) => ({
      blogs: data?.blogs || [],
      pagination: data?.pagination || null,
    }),
  });
};

export default useBlogs;
