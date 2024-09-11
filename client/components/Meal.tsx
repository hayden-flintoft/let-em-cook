import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/MealCard'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const ingredients = [
  { id: 1, text: '1/2 tbsp olive oil' },
  { id: 2, text: '100g / 3 oz salami stick, cut into 3mm / 1/8" thick rounds' },
  {
    id: 3,
    text: '2 x 305g / 8 oz chicken breasts (large), cut in half horizontally',
  },
  { id: 4, text: '1/2 tsp cooking salt / kosher salt' },
  { id: 5, text: '1/4 tsp black pepper' },
  { id: 6, text: '1/2 tsp garlic powder' },
  { id: 7, text: '3/4 tsp paprika' },
  { id: 8, text: '1/4 tsp sage powder (optional)' },
  { id: 9, text: '2 garlic cloves, finely minced' },
  { id: 10, text: '1/2 onion, finely chopped' },
]

export default function CardWithForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[60%] max-w-[1000px] p-4 shadow-lg">
        <CardHeader>
          <p className="scroll-m-20 text-4xl font-extrabold tracking-tight text-[#9E3700] lg:text-5xl">
            Recipe
          </p>
          <CardDescription className="text-[#9E3700]">
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-[#9E3700]">
                  Recipe Name
                </Label>
                <img src="images/Meals-by-Chefkraft.png" alt="food" />
                <div className="container mx-auto p-4">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox />
                      <p>{ingredient.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework" className="text-[#9E3700]">
                  Cuisine
                </Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-[#9E3700] text-[#9E3700]">
            Cancel
          </Button>
          <Button className="bg-[#9E3700] text-white">Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
