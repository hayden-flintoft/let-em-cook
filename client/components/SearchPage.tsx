import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const areas = [
  'American',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Dutch',
  'Egyptian',
  'Filipino',
  'French',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Unknown',
  'Vietnamese',
]

export default function SearchPage() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

  const handleCuisineChange = (area: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area],
    )
  }

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
          <div className="mb-4 flex space-x-4">
            <Select>
              <SelectTrigger className="h-12 w-64 bg-white font-bold text-gray-700">
                <SelectValue placeholder="Please select..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72 w-full">
                  {areas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center p-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        id={area}
                        checked={selectedCuisines.includes(area)}
                        onChange={() => handleCuisineChange(area)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={area}
                        className="cursor-pointer font-bold text-gray-700"
                      >
                        {area}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
            <div className="flex space-x-4">
              <Select>
                <SelectTrigger className="h-12 w-64 bg-white font-bold text-gray-700">
                  <SelectValue placeholder="Please select..." />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-1">
                    <div className="cursor-pointer p-2 font-bold hover:bg-gray-100">
                      Item 1
                    </div>
                    <div className="cursor-pointer p-2 font-bold hover:bg-gray-100">
                      Item 2
                    </div>
                  </div>
                </SelectContent>
              </Select>

              {/* Submit Button */}
              <button className="h-12 w-32 rounded bg-blue-500 font-bold text-white hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
