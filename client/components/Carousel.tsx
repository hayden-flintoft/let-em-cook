import { useEffect, useRef } from 'react'

interface CarouselProps {
  options: string[]
  selectedOption: string | null
  onOptionSelect: (option: string, type: 'category' | 'cuisine') => void
  isCuisine: (option: string) => boolean
}

export default function Carousel({
  options,
  selectedOption,
  onOptionSelect,
  isCuisine,
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
    }, 1) // Speed of the scroll

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
            option === selectedOption ? 'border-b-4 border-yellow-500' : ''
          }`}
          onClick={() =>
            onOptionSelect(option, isCuisine(option) ? 'cuisine' : 'category')
          }
        >
          {/* Convert the option to lowercase when constructing the image source */}
          <img
            src={`images/${option.toLowerCase()}.png`}
            alt={option}
            className={`mb-2 h-16 w-16 rounded-full object-cover ${option === selectedOption ? 'ring-2 ring-yellow-500' : ''}`}
          />
          <span
            className={`text-sm ${option === selectedOption ? 'font-bold text-yellow-500' : ''}`}
          >
            {option}
          </span>
        </div>
      ))}
    </div>
  )
}
