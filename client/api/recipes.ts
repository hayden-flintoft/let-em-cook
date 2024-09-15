import request from 'superagent'

export const fetchRecipesByLetter = async (
  letter: string,
  page: number,
  limit: number,
) => {
  const response = await request.get(
    `/api/v1/meals/search?letter=${letter}&page=${page}&limit=${limit}`,
  )
  return response.body
}
