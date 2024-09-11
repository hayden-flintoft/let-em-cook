export interface Meals {
  meals: Meal[]
}

export interface Meal {
  meals: { [key: string]: null | string }[]
}

// export interface Meal {
//   strMeal: string
//   strMealThumb: string
//   idMeal: string
// }
