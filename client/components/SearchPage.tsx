import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import useIngredients from '@/hooks/use-findrecipe'

export default function SearchPage() {
  const { data: ingredients, isLoading, error } = useIngredients()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-3xl shadow-lg">
      <img
        src="/images/Meals-by-Chefkraft.png"
        alt="Various delicious meals"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="mb-8 text-4xl font-bold text-white drop-shadow-lg">
            Select Cuisine and Add Your Ingredients
          </h2>
          <div className="mb-4 flex justify-center space-x-4">
            <Select>
              <SelectTrigger className="h-16 w-80 bg-white text-lg font-bold text-gray-700">
                <SelectValue placeholder="Select cuisine..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72 w-full">
                  {/* Replace with actual cuisine data when available */}
                  {['Italian', 'Chinese', 'Mexican', 'Indian'].map(
                    (cuisine) => (
                      <div
                        key={cuisine}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input type="checkbox" id={cuisine} className="mr-2" />
                        <label
                          htmlFor={cuisine}
                          className="cursor-pointer font-bold text-gray-700"
                        >
                          {cuisine}
                        </label>
                      </div>
                    ),
                  )}
                </ScrollArea>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-16 w-80 bg-white text-lg font-bold text-gray-700">
                <SelectValue placeholder="Select ingredients..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72 w-full">
                  {ingredients && ingredients.length > 0 ? (
                    ingredients.map((ingredient) => (
                      <div
                        key={ingredient.idIngredient}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          id={ingredient.idIngredient}
                          className="mr-2"
                        />
                        <label
                          htmlFor={ingredient.idIngredient}
                          className="cursor-pointer font-bold text-gray-700"
                        >
                          {ingredient.strIngredient}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">
                      No ingredients available
                    </div>
                  )}
                </ScrollArea>
              </SelectContent>
            </Select>
            <button className="h-16 w-40 rounded bg-blue-500 text-lg font-bold text-white hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
