import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../core/models/ingredient";
import {NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
  ],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit {

  @Input() ingredient!: Ingredient;
  protected readonly environment = environment;

  constructor() {

  }

  ngOnInit(): void {

  }
}











