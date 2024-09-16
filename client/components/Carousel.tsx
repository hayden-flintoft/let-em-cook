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
        carouselRef.current.scrollLeft += 1 // Adjust the speed as needed
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth / 2
        ) {
          carouselRef.current.scrollLeft = 0 // Reset scroll to the beginning
        }
      }
    }, 20) // Speed of the scroll

    return () => clearInterval(scrollInterval) // Clean up the interval
  }, [])

  return (
    <div
      ref={carouselRef}
      className="no-scrollbar flex overflow-x-auto whitespace-nowrap"
    >
      {options.map((option, index) => (
        <div
          key={`${option}-${index}`}
          className={`mx-4 flex min-w-[150px] cursor-pointer flex-col items-center ${
            option === selectedOption ? '' : ''
          }`}
          onClick={() =>
            onOptionSelect(option, isCuisine(option) ? 'cuisine' : 'category')
          }
        >
          {/* Convert the option to lowercase when constructing the image source */}
          <img
            src={`images/${option.toLowerCase()}.png`}
            alt={option}
            className={`mb-2 h-16 w-16 object-cover ${
              option === selectedOption ? '' : ''
            }`}
          />
          <span
            className={`text-sm ${
              option === selectedOption ? 'font-bold text-yellow-500' : ''
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
