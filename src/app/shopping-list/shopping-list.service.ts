import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditingSubject = new Subject<number>();
  startedEditingObservable: Observable<
    number
  > = this.startedEditingSubject.asObservable();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getByIndex(index: number) {
    return this.ingredients[index];
  }
  updateByIndex(index: number, ing: Ingredient) {
    const newOne = {
      ...this.ingredients[index],
      ...ing
    };
    this.ingredients[index] = newOne;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  startedEditing(index: number) {
    this.startedEditingSubject.next(index);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
