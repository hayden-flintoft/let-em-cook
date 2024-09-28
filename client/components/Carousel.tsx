// client/components/Carousel.tsx
import { useEffect, useRef } from 'react'
import RandomRecipeButton from './RandomRecipeButton'

interface CarouselProps {
  options: string[]
  selectedOption: string | null
  onOptionSelect: (option: string, type: 'category' | 'cuisine') => void
  isCuisine: (option: string) => boolean
  onRandomRecipeClick: () => void
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
        const { scrollLeft, scrollWidth } = carouselRef.current

        // Increment the scroll position
        carouselRef.current.scrollLeft += 1

        // If scrollLeft reaches half the scrollWidth (the end of the first set), reset it to the start
        if (scrollLeft >= scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0
        }
      }
    }, 50) // Adjust the scroll speed as needed

    return () => clearInterval(scrollInterval) // Clean up the interval
  }, [])

  return (
    <div
      ref={carouselRef}
      className="no-scrollbar flex overflow-x-auto whitespace-nowrap px-2 pb-4 md:px-4"
    >
      {/* Duplicate the options to create the infinite scroll effect */}
      {[...options, ...options].map((option, index) => (
        <div
          key={`${option}-${index}`}
          className={`mx-2 flex min-w-[80px] cursor-pointer flex-col items-center sm:min-w-[100px] md:mx-4 md:min-w-[150px] ${
            option === selectedOption ? 'rounded-lg text-[#9E3700]' : ''
          }`}
          onClick={() =>
            onOptionSelect(option, isCuisine(option) ? 'cuisine' : 'category')
          }
        >
          <img
            src={`/images/${option.toLowerCase()}.svg`}
            alt={option}
            className={`mb-2 h-10 w-10 rounded-lg object-cover sm:h-12 sm:w-12 md:h-16 md:w-16 ${
              option === selectedOption ? '' : ''
            }`}
          />
          <span
            className={`text-xs sm:text-sm md:text-base ${
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
