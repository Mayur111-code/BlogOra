import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useDeleteBlog = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/blog/delete/${id}`);
      return data;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["my-blogs"] });
      const previous = qc.getQueryData(["my-blogs"]);
      qc.setQueryData(["my-blogs"], (old = []) =>
        Array.isArray(old) ? old.filter((b) => b._id !== id) : old
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData(["my-blogs"], context.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
      qc.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export default useDeleteBlog;
