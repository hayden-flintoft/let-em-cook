import { fetchRecipeById } from '@/api/recipes'
import { useQuery } from '@tanstack/react-query'

export default function useRecipe(id) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
  });
}