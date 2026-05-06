import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useCreateBlog = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post("/blog/create", formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blogs"] });
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
    },
  });
};

export default useCreateBlog;
