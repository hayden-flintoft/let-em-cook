import useAddComment from '@/hooks/use-comment'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AddComment() {
  const [orderNote, setOrderNote] = useState('')

  const { user } = useUser()
  const { id } = useParams()

  const handleChange = (e) => {
    const comment = e.target.value
    setOrderNote(comment)
    console.log(orderNote)
  }

  const addMutation = useAddComment()
  const onSubmit = async (e) => {
    e.preventDefault()
    const commentDataObj = {
      clerkId: user?.id,
      username: user?.username,
      recipeId: Number(id),
      comment: orderNote,
    }
    await addMutation.mutate(commentDataObj)
    setOrderNote('')
    console.log('done')
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="comment">comment</label>
      <textarea
        id="OrderNotes"
        value={orderNote}
        onChange={handleChange}
        className="w-full resize-none rounded-3xl border-x-0 border-t-0 border-[#9E3700] px-3 py-2 text-center align-middle sm:text-sm"
        rows={4}
        placeholder="Enter any additional order notes..."
      ></textarea>
      <button className="rounded bg-[#9E3700] px-3 py-1.5 text-sm font-medium text-white">
        Add
      </button>
    </form>
  )
}
