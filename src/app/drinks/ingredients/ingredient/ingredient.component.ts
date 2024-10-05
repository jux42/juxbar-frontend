import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../core/models/ingredient";
import {NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {IngredientService} from "../../../core/services/ingredientService";

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
  ],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss'
})
export class IngredientComponent {

  @Input() ingredient!: Ingredient;
  ingredients: Ingredient[] = [];
  protected readonly environment = environment;

  constructor(private ingredientService: IngredientService) {
  }

}
