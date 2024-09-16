import { addComment } from '@/api/comment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentData } from 'models/comments'

export default function useAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CommentData) => addComment(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}
