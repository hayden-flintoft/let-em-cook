import { useEffect, useRef } from 'react'
import RandomRecipeButton from './RandomRecipeButton' // Import RandomRecipeButton

interface CarouselProps {
  options: string[]
  selectedOption: string | null
  onOptionSelect: (option: string, type: 'category' | 'cuisine') => void
  isCuisine: (option: string) => boolean
  onRandomRecipeClick: () => void // Add prop to handle random recipe button click
}

export default function Carousel({
  options,
  selectedOption,
  onOptionSelect,
  isCuisine,
  onRandomRecipeClick,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1 // Adjust the speed
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth / 2
        ) {
          carouselRef.current.scrollLeft = 0 // Reset scroll to the beginning
        }
      }
    }, 50) // Speed of the scroll

    return () => clearInterval(scrollInterval) // Clean up the interval
  }, [])

  return (
    <div
      ref={carouselRef}
      className="no-scrollbar flex overflow-x-auto whitespace-nowrap px-2 pb-4 md:px-4" // Added padding-bottom
    >
      {options.map((option, index) => (
        <div
          key={`${option}-${index}`}
          className={`mx-2 flex min-w-[100px] cursor-pointer flex-col items-center md:mx-4 md:min-w-[150px] ${
            option === selectedOption
              ? 'rounded-lg border border-primary ring-2 ring-primary'
              : ''
          }`}
          onClick={() =>
            onOptionSelect(option, isCuisine(option) ? 'cuisine' : 'category')
          }
        >
          <img
            src={`/images/${option.toLowerCase()}.svg`}
            alt={option}
            className={`mb-2 h-12 w-12 rounded-lg object-cover md:h-16 md:w-16 ${
              option === selectedOption ? 'ring-2 ring-primary' : ''
            }`}
          />
          <span
            className={`text-sm md:text-base ${
              option === selectedOption
                ? 'font-bold text-primary'
                : 'text-muted'
            }`}
          >
            {option}
          </span>
        </div>
      ))}

      {/* Random Recipe Button added to the end of the carousel */}
      <RandomRecipeButton onClick={onRandomRecipeClick} />
    </div>
  )
}
