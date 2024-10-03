import {Component, Input, OnInit} from '@angular/core';
import {PersonalCocktail} from "../../core/models/personal-cocktail";
import {Observable} from "rxjs";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {environment} from "../../../environments/environment";
import {PersonalCocktailService} from "../../core/services/personal-cocktail.service";

@Component({
  selector: 'app-personalCocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    NgClass
  ],

  templateUrl: './personal-cocktail.component.html',
  styleUrl: './personal-cocktail.component.scss'
})
export class PersonalCocktailComponent implements OnInit {

  @Input() personalCocktail !: PersonalCocktail;
  personalCocktail$!: Observable<PersonalCocktail>;
  isLoading: boolean = true;
  id!: number;
  imageLoaded: { [key: string]: boolean } = {};
  mouseIsOn: boolean = false;
  protected readonly environment = environment;

  constructor(private personalCocktailService: PersonalCocktailService) {
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

  onMouseEnter() {
    this.mouseIsOn = true;
    console.log("mouse enter");
  }

  onMouseLeave() {
    this.mouseIsOn = false;
    console.log("mouse leave");
  }

  goToCocktail() {
    //TODO : go personal cocktail
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

  onDeleteCocktail(personalCocktail: PersonalCocktail) {
    this.personalCocktailService.deletePersonalCocktail(personalCocktail).subscribe(
        (value: any) => {
        console.log(value);
        window.location.reload();
      }
    );
  }

  onTrashCocktail(personalCocktail: PersonalCocktail) {
    this.personalCocktailService.trashPersonalCocktail(personalCocktail).subscribe(
        (value: any) => {
        console.log(value);
        window.location.reload();
      }
    );
  }
}
