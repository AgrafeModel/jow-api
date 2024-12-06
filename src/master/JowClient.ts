import fetch, { Headers, HeadersInit, Response } from "node-fetch";
import {
  Ingredient,
  IngredientRecipes,
  isRecipe,
  Languages,
  Recipe,
} from "../types/data";

export class JowClient {
  constructor(public readonly language: Languages = "fr") {}

  /**
   * Base URL for the API based on the chosen language
   */
  get BASE_URL() {
    switch (this.language) {
      case "fr":
        return "https://api.jow.fr";
      case "us":
        return "https://api-us.prod.jow.tech";
      default:
        throw new Error("Language not supported");
    }
  }

  /**
   * /public/recipe/quicksearch
   * Used to search for a recipe by its name
   */
  protected static search_recipe_url: string = "/public/recipe/quicksearch";

  /**
   * /public/recipes/recipesFromIngredientsId
   * Used to search for a recipe by its ingredients
   */
  protected static search_recipe_by_ingredient_url: string =
    "/public/recipes/recipesFromIngredientsId";

  /**
   * /public/ingredients
   * Used to get all ingredients
   */
  protected static get_ingredients_url: string = "/public/ingredients";

  //======== Parameters ========//
  protected static defaultHeaders: HeadersInit = {
    accept: "*/*",
    "accept-language": "fr,fr-FR;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
  };

  /**
   *
   * @param param : string - the recipe name to search for
   * @returns Recipe[] - the list of recipes matching the search
   */
  async getRecipes(param: string): Promise<Recipe[]> {
    const res = await fetch(
      this.BASE_URL + JowClient.search_recipe_url + "?query=" + param,
      {
        method: "POST",
        headers: JowClient.defaultHeaders,
      },
    );
    const json = await res.json();
    this.handleError(json);
    return this.parseReponse<Recipe>(json);
  }

  /**
   *
   * @param ingredientId
   * @returns Recipe[] - the list of recipes containing the ingredient
   */
  async getRecipesByIngredient(
    ingredientIds: string[],
  ): Promise<IngredientRecipes[]> {
    const res = await fetch(
      this.BASE_URL + JowClient.search_recipe_by_ingredient_url,
      {
        method: "POST",
        headers: JowClient.defaultHeaders,
        body: JSON.stringify(ingredientIds),
      },
    );

    const json = await res.json();
    this.handleError(json);
    return this.parseReponse<IngredientRecipes>(json);
  }

  /**
   *
   * @returns
   */
  async getIngredients(): Promise<Ingredient[]> {
    const res = await fetch(this.BASE_URL + JowClient.get_ingredients_url, {
      method: "GET",
      headers: JowClient.defaultHeaders,
    });

    const json = await res.json();
    this.handleError(json);
    return this.parseReponse<Ingredient>(json);
  }

  /*--------= Parsers =--------*/

  private handleError(response: unknown) {
    if (
      typeof response === "object" &&
      response !== null &&
      "code" in response &&
      "err" in response
    ) {
      const res = response as { code: string; err: string };

      if (res.code === "ERROR" && typeof res.err === "string") {
        throw new Error(res.err);
      }
    }
  }

  private async parseReponse<T>(data: unknown): Promise<T[]> {
    try {
      if (typeof data !== "object" || data === null) {
        throw new Error("Data is not in the expected format");
      }
      if (Array.isArray(data)) {
        return data as T[];
      } else if (data && Array.isArray(data)) {
        return data as T[];
      } else {
        throw new Error("Le format des données est incorrect.");
      }
    } catch (error) {
      throw new Error("Error while parsing the response: " + error);
    }
  }
}
