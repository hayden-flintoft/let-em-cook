export interface Meals {
  meals: Meal[]
}

export interface MealList {
  meals: MealListItem[]
}

export interface Meal {
  meals: { [key: string]: null | string }[]
}

export interface MealListItem {
  strMeal: string
  strMealThumb: string
  idMeal: string
}
