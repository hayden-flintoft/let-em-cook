import { useQuery } from '@tanstack/react-query'
import { getMealByIngredients } from '@/api/meal'
import { Meal } from '../../models/meals'

export default async function useRecipes(selectedIngredients: string[]) {
  const ingredientQuery = selectedIngredients.join(',')

  return useQuery<Meal[]>({
    queryKey: ['recipes', ingredientQuery],
    queryFn: () => getMealByIngredients(ingredientQuery),
    enabled: selectedIngredients.length > 0,
  })
}
