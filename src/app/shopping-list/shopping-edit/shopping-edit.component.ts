import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subject, Observable, Subscribable, Subscription } from "rxjs";
import { ButtonState } from "../shoppingEnum";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("shoppingForm") shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  index: number;

  constructor(private slService: ShoppingListService) {}

  pat = "^[1-9]+[0-9]*$";
  ngOnInit() {
    this.subscription = this.slService.startedEditingObservable.subscribe(
      (index: number) => {
        this.editMode = true;
        this.index = index;
        this.editedItem = this.slService.getByIndex(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem() {
    const formValuse = this.shoppingForm.value;
    if (this.editMode) {
      this.slService.updateByIndex(
        this.index,
        new Ingredient(formValuse.name, formValuse.amount)
      );
    } else {
      const newIngredient = new Ingredient(formValuse.name, formValuse.amount);
      this.slService.addIngredient(newIngredient);
    }
    this.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  clear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }
  deleteIngredient() {
    this.slService.deleteIngredient(this.index);
    this.clear();
  }
}
