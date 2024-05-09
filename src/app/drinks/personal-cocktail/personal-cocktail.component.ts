import {Component, Input, OnInit} from '@angular/core';
import {PersonalCocktail} from "../../core/models/personal-cocktail";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-personalCocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    RouterLink
  ],

  templateUrl: './personal-cocktail.component.html',
  styleUrl: './personal-cocktail.component.scss'
})
export class PersonalCocktailComponent implements OnInit {


  @Input() personalCocktail !: PersonalCocktail;
  personalCocktail$!: Observable<PersonalCocktail>;
  imageData!: Response;
  id!: number;
  protected readonly environment = environment;
  imageLoaded: {[key: string]: boolean} = {};

  constructor() {
  }

  ngOnInit() {

  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }



  getIngredients(personalCocktail: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = personalCocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }
}
