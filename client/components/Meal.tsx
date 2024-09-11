// import { getMealById } from '@/api/meal'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
} from '@/components/ui/MealCard'
import { Checkbox } from '@/components/ui/checkbox'

const meals = {
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken Casserole',
  strDrinkAlternate: null,
  strCategory: 'Chicken',
  strArea: 'Japanese',
  strInstructions:
    'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!',
  strMealThumb:
    'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  strTags: 'Meat,Casserole',
  strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
  ingredients: [
    'soy sauce',
    'water',
    'brown sugar',
    'ground ginger',
    'minced garlic',
  ],
  strMeasure1: '3/4 cup',
  strMeasure2: '1/2 cup',
  strMeasure3: '1/4 cup',
  strMeasure4: '1/2 teaspoon',
  strMeasure5: '1/2 teaspoon',
  strMeasure6: '4 Tablespoons',
  strMeasure7: '2',
  strMeasure8: '1 (12 oz.)',
  strMeasure9: '3 cups',
  strMeasure10: '',
  strMeasure11: '',
  strMeasure12: '',
  strMeasure13: '',
  strMeasure14: '',
  strMeasure15: '',
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
}

export default function CardWithForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-pressed w-[60%] max-w-[1000px] p-4 shadow-lg">
        <CardHeader>
          <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
            {meals.strMeal}
          </p>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <img
                  src={meals.strMealThumb}
                  alt="food"
                  className="mx-auto w-[60%] object-cover"
                />
                <br></br>
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Step by step!
                </p>
                <br></br>
                <p className="text-l scroll-m-20 font-extrabold tracking-tight text-[#9E3700]">
                  {' '}
                  {meals.strInstructions}
                </p>
                <br></br>
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Ingredients!
                </p>
                <div className="container mx-auto p-4">
                  {/* Map over ingredients */}
                  {meals.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox />
                      {/* Combine the ingredient with its measurement */}
                      <p>
                        {meals[`strMeasure${index + 1}`]} {ingredient}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Watch how to make it
                </p>
                <br></br>
                <div className="flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${meals.strYoutube.split('=')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-[60%] rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
