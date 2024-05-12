import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {CocktailService} from "../../../../core/services/cocktailService";
import {map, Observable, Subject} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {UserRequest} from "../../../../core/models/UserRequest";

@Component({
  selector: 'app-cocktail',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent implements OnInit, OnDestroy {

  @Input() cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  private destroy$ = new Subject<void>();

  id!: number;
  protected readonly environment = environment;
  imageLoaded: {[key: string]: boolean} = {};
  isFavourite: boolean = false;
  @Input() userRequest!: UserRequest


  constructor(private cocktailService: CocktailService, private router: Router, ) {
  }

  ngOnInit() {

    this.cocktailService.getFavouriteCocktailsCached().pipe(

      map(favouriteCocktails => {
        this.isFavourite = favouriteCocktails.some(favCocktail => favCocktail.id === this.cocktail.id);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  goToCocktail() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
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
}
