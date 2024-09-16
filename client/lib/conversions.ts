export const convertToMetric = (
  value: number,
  unit: string,
): { value: number; unit: string } => {
  const conversionRates: { [key: string]: number } = {
    cups: 240, // cups to millilitres
    oz: 28.35, // ounces to grams
    tsp: 5, // teaspoons to millilitres
    tbsp: 15, // tablespoons to millilitres
    lb: 454, // pounds to grams
  }

  if (unit in conversionRates) {
    return {
      value: value * conversionRates[unit],
      unit: unit === 'oz' ? 'g' : 'ml',
    }
  }
  return { value, unit }
}

export const convertToImperial = (
  value: number,
  unit: string,
): { value: number; unit: string } => {
  const conversionRates: { [key: string]: number } = {
    ml: 0.00422675, // millilitres to cups
    g: 0.03527396, // grams to ounces
    tsp: 0.202884, // millilitres to teaspoons
    tbsp: 0.067628, // millilitres to tablespoons
    kg: 2.20462, // kilograms to pounds
  }

  if (unit in conversionRates) {
    return {
      value: value * conversionRates[unit],
      unit: unit === 'g' ? 'oz' : 'cups',
    }
  }
  return { value, unit }
}

export const convertTemperature = (
  value: number,
  toCelsius: boolean,
): number => {
  return toCelsius ? ((value - 32) * 5) / 9 : (value * 9) / 5 + 32
}

export const extractAndConvertIngredients = (meal: any, isMetric: boolean) => {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (
      ingredient &&
      ingredient.trim() !== '' &&
      measure &&
      measure.trim() !== ''
    ) {
      const [value, unit] = splitMeasure(measure)
      const converted = isMetric
        ? convertToMetric(value, unit)
        : convertToImperial(value, unit)
      ingredients.push({
        ingredient,
        measure: `${converted.value.toFixed(2)} ${converted.unit}`,
      })
    }
  }

  return ingredients
}

export const splitMeasure = (measure: string) => {
  const parts = measure.trim().split(' ')
  const value = parseFloat(parts[0])
  const unit = parts[1] || ''
  return [value, unit]
}
