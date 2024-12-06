export type Author = {
  id: string;
  name: string;
  imageUrl: string;
};

export type BackgroundPattern = {
  color: string;
  imageUrl: string;
};

export type EatingHabitsCompatibility = {
  porkless: boolean;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  pescatarian: boolean;
};

export type Origin = {
  updatedAt: string;
  createdAt: string;
  name: string;
  id: string;
};

export type PricePerPortionTag = {
  level: number;
  currency: string;
  label: string;
};

export type Constituent = {
  isOptional: boolean;
  ingredient: RecipeIngredients;
  unit: Unit;
  additionalMeasures: Measure[];
  alternatives: Alternative[];
};

export type Ingredient = {
  id: string;
  name: string;
  imageUrl: string;
};

export type RecipeIngredients = Ingredient & {
  alternativeUnits: Unit[];
  quantityPerCover: number;
};

export type Unit = {
  id: string;
  name: string;
};

export type Measure = {
  id: string;
  name: string;
};

export type Alternative = {
  id: string;
  name: string;
};

export type Recipe = {
  id: string;
  aggregateRating: number;
  author: Author;
  availableLocales: string[];
  backgroundColor: string;
  backgroundPattern: BackgroundPattern;
  composition: string;
  cookingTime: number;
  createdAt: string;
  description: string;
  difficulty: number;
  eatingHabitsCompatibility: EatingHabitsCompatibility;
  imageUrl: string;
  imageWithBackgroundPatternUrl: string;
  isAvailable: boolean;
  isTasteCompatible: boolean;
  isVisible: boolean;
  likes: number;
  minimumCoversRequired: number;
  negativeFeedbacks: number;
  notTrivialRequiredToolsIds: string[];
  origin: Origin;
  positiveFeedbacks: number;
  posterUrl: string;
  preparationExtraTimePerCover: number;
  preparationTime: number;
  pricePerPortion: number;
  pricePerPortionTag: PricePerPortionTag;
  requiredTools: Tool[];
  roundedCoversCount: number;
  seasons: string[];
  slug: string;
  source: string;
  tagsEdito: string[];
  title: string;
  type: string;
  unavailableIngredientsIds: string[];
  videoUrl: string;
  constituents: Constituent[];
  userConstituents: Constituent[];
  labels: string[];
  origins: string[];
  categories: string[];
};

export type Tool = {
  id: string;
  name: string;
  availabilityZones: string[];
  childrenTools: Tool[];
  createdAt: string;
  isDefaultChecked: boolean;
  isNotTrivial: boolean;
  updatedAt: string;
};

export type Languages = "fr" | "us";

export function isRecipe(data: unknown): data is Recipe {
  if (typeof data !== "object" || data === null) return false;

  const recipe = data as Partial<Recipe>;
  return (
    typeof recipe.title === "string" &&
    Array.isArray(recipe.availableLocales) &&
    typeof recipe.aggregateRating === "number" &&
    typeof recipe.description === "string"
  );
}

export type IngredientRecipes = {
  additionalRequiredIngredients: Ingredient[];
  recipes: Recipe[];
};
