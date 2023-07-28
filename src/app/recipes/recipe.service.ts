import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test recipe',
  //     'This is a test',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Potatoes', 10),
  //     ]
  //     ),
  //   new Recipe(
  //     'Another Test recipe',
  //     'This is another test',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2023/04/Trifle-bowl-coronation-salad-0ad63bf.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingredient('Bananas', 3),
  //       new Ingredient('Carrots', 2),
  //     ]
  //     ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe( index: number ) {
    return this.recipes[index];
  }

  addIngToList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
