import request from 'superagent'

export const fetchRecipesAlphabetically = async (
  letter: string,
  page: number,
  limit: number,
) => {
  const response = await request.get(
    `/api/v1/meals/alphabetical?letter=${letter}&page=${page}&limit=${limit}`,
  )
  return response.body
}
