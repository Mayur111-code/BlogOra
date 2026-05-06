import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const queryKeys = {
  blogs: (params) =>
    params ? ["blogs", params] : ["blogs"],
  blog: (id) => ["blog", id],
  myBlogs: () => ["my-blogs"],
  profile: () => ["profile"],
};

export default queryClient;
