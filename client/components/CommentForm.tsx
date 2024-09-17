import useAddComment from '@/hooks/use-comment'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AddComment({ setComments, comments }) {
  const [orderNote, setOrderNote] = useState('')

  const { user } = useUser()
  const { id } = useParams()

  const handleChange = (e) => {
    const comment = e.target.value
    setOrderNote(comment)
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
    // Update comments in the parent component
    setComments([...comments, commentDataObj])
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-[#9E3700] p-4"
    >
      <textarea
        id="OrderNotes"
        value={orderNote}
        onChange={handleChange}
        className="w-full resize-none rounded-3xl border-x-0 border-t-0 border-[#9E3700] px-3 py-2 text-center align-middle sm:text-sm"
        rows={5}
        placeholder="Write your comment..."
      ></textarea>
      <br />
      <br />
      {/* Add button moved to the right */}
      <div className="flex justify-end">
        <button className="rounded bg-[#9E3700] px-3 py-1.5 text-sm font-medium text-white">
          Add
        </button>
      </div>
    </form>
  )
}
