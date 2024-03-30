import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {CocktailService} from "../../../core/services/cocktailService";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    RouterLink
  ],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.css'
})
export class CocktailComponent implements OnInit{

  @Input()   cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!:number;
  constructor(private cocktailService: CocktailService, private router: Router) {
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
  goToCocktail(){
    this.router.navigateByUrl(`juxbar/onecocktail/${this.cocktail.id}`)
  }
  getIngredients(cocktail: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  protected readonly environment = environment;
}
