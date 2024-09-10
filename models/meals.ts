export interface Meals {
  meals: Meal[]
}

export interface Meal {
  meals: { [key: string]: null | string }[]
}

export interface Meal {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

export interface Meal {
  strCategory: string
}

export interface Meal {
  strArea: string
}

export interface Meal {
  idIngredient: string
  strIngredient: string
  strDescription: string
  strType: null
}

export interface Meals {
  categories: Category[]
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}
