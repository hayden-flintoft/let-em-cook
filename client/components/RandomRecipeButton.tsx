interface RandomRecipeButtonProps {
  onClick: () => void
}

export default function RandomRecipeButton({
  onClick,
}: RandomRecipeButtonProps) {
  return (
    <div
      className="mx-4 flex min-w-[150px] cursor-pointer flex-col items-center"
      onClick={onClick}
    >
      <img
        src="/images/random.png"
        alt="Random"
        className="mb-2 h-16 w-16 rounded-full object-cover"
      />
      <span className="text-sm">Random Recipe</span>
    </div>
  )
}
