# Jow [unofficial] API - 0.1.0

This is a simple API wrapper for the [Jow](https://jow.fr) website.
Retrieve with ease all the recipes from jow

- Work in progress

---

# Usage

First, create an instance of the wrapper :
```ts
import { JowClient } from "jow-api";

const client = new JowClient("fr");
```

Then, you can use the methods to retrieve data :

```ts
const recipes = await client.getRecipes("pâtes");
```

---

# API

## `getRecipes(param: string): Promise<Recipe[]>`
Search for a recipe by its name
```ts
const recipes = await client.getRecipes("pâtes");
```


## `getRecipesByIngredient(ingredientIds: string[]): Promise<IngredientRecipes[]>`
Search for a recipe by its ingredients. You can find the ingredient IDs in the `ingredients` property of the recipe, or by using the `getIngredients()` method.
```ts
const recipes = await client.getRecipesByIngredient(["1", "2"]);
```

## `getIngredients(): Promise<Ingredient[]>`
Get all ingredients
```ts
const ingredients = await client.getIngredients();
```

# License
MIT
