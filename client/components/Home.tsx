import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

export default function Home() {
  return (
    <>
      <SignInButton></SignInButton>
      <div className="flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-4">
          <img src="/images/Letemcook.png" alt="Logo" className="w-50" />
        </div>

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
    </>
  )
}
