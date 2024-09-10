import { useUser, useClerk } from '@clerk/clerk-react'

export default function Home() {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()

  const handleSignIn = () => {
    openSignIn() // Opens the sign-in modal provided by Clerk
  }

  const handleSignOut = () => {
    signOut() // Signs the user out
  }

  return (
    <div className="flex flex-col items-center">
      {/* Logo Section */}
      <div className="mb-4">
        <img src="/images/Letemcook.png" alt="Logo" className="w-50 mx-auto" />
      </div>

      {/* Button Section */}
      <div className="mb-4 flex gap-4">
        {!user ? (
          <button
            onClick={handleSignIn}
            className="rounded-3xl bg-[#9E3700] p-3 text-white"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            className="rounded-3xl bg-[#9E3700] p-3 text-white"
          >
            Sign Out
          </button>
        )}
      </div>

      <p className="mb-4 text-center">Hello {user?.firstName}</p>

      <div className="relative w-full">
        <div className="h-[300px] w-full overflow-hidden rounded-3xl">
          <img
            src="/images/Meals-by-Chefkraft.png"
            alt="Food"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}
