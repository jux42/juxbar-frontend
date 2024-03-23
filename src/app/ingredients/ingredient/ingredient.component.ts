import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../core/models/ingredient";
import {NgIf, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../core/services/ingredientService";

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
export class IngredientComponent implements OnInit{

  @Input() ingredient!: Ingredient;

  constructor(private router: Router, private ingredientService: IngredientService, private route: ActivatedRoute  ) {

  }

  ngOnInit(): void {



    }
  }











