import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { JowClient } from "."; // ajustez le chemin si nécessaire

// WIP

// Mock `fetc h`
globalThis.fetch = vi.fn();

const mockFetch = globalThis.fetch as MockedFunction<typeof fetch>;

const mockErrorResponse = {
  code: "ERROR",
  err: "Invalid request",
};

describe("JowClient", () => {
  let client: JowClient;

  beforeEach(() => {
    client = new JowClient("fr");
    vi.clearAllMocks();
  });

  it("should fetch recipes based on a search term", async () => {
    const recipes = await client.getRecipes("pâtes");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.jow.fr/public/recipe/quicksearch?query=pâtes",
      expect.objectContaining({
        method: "POST",
      }),
    );

    expect(recipes).toBeDefined();
  });

  it("should fetch recipes by ingredient IDs", async () => {
    const recipes = await client.getRecipesByIngredient(["1", "2"]);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.jow.fr/public/recipes/recipesFromIngredientsId",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(["1", "2"]),
      }),
    );

    expect(recipes).toBeDefined();
  });

  it("should fetch all ingredients", async () => {
    const ingredients = await client.getIngredients();

    expect(fetch).toHaveBeenCalledWith(
      "https://api.jow.fr/public/ingredients",
      expect.objectContaining({
        method: "GET",
      }),
    );

    expect(ingredients).toBeDefined();
  });

  it("should throw an error for invalid responses", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockErrorResponse,
    } as Response);

    await expect(client.getRecipes("invalid")).rejects.toThrow(
      "Invalid request",
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://api.jow.fr/public/recipe/quicksearch?query=invalid",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("should throw an error for malformed data", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => "unexpected data",
    } as Response);

    await expect(client.getRecipes("pâtes")).rejects.toThrow(
      "Data is not in the expected format",
    );
  });
});
