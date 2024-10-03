import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {CocktailService} from "../../../../core/services/cocktailService";
import {Subject} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BoldWordsPipe} from "../../../../core/services/bold-words.pipe";
import {environment} from "../../../../../environments/environment";
import {CapitalizeFirstPipe} from "../../../../capitalize-first.pipe";
import {FavouriteService} from "../../../../core/services/favourite.service";

@Component({
  selector: 'app-single-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    BoldWordsPipe
  ],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.scss'
})
export class SingleCocktailComponent implements OnInit, OnDestroy {

  @Input() cocktail !: Cocktail;
  showModal: boolean = false;
  id!: number;
  imageLoaded: { [key: string]: boolean } = {};
  isFavourite: boolean = false;
  mouseIsOn: boolean = false;
  private destroy$ = new Subject<void>();
  protected readonly environment = environment;

  constructor(private cocktailService: CocktailService,
              private route: ActivatedRoute,
              private router: Router,
              private favouriteService: FavouriteService,
              private capitalizeFirst: CapitalizeFirstPipe) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.cocktailService.getOneById('cocktail',id).subscribe(data => {
      this.cocktail = data;
      this.checkFavourites();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkFavourites() {
    let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
    this.isFavourite = userFav.some((fav: any) => fav.id === this.cocktail.id);
  }

  onAddFavouriteCocktail(cocktail: Cocktail): void {
    if (sessionStorage.getItem('username') == null) {
      this.router.navigate(['/login']).then(r =>r );
    } else {
      if (!this.isFavourite) {
        let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
        this.cocktailService.addFavouriteCocktail(cocktail.id).subscribe(() => {
          this.isFavourite = true;
        });
        userFav.push(this.cocktail);
        sessionStorage.setItem('favouritecocktails', JSON.stringify(userFav));
      } else {
        alert("This is already a favourite.");
      }
      this.checkFavourites();
    }
  }

  onRemoveFavouriteCocktail(cocktail: Cocktail): void {
    if (this.isFavourite) {
      let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
      this.cocktailService.removeFavouriteCocktail(cocktail.id).subscribe(() => {
        this.isFavourite = false;
        this.favouriteService.announceFavouriteRemoved(cocktail.id, 'cocktail');
      });

      const filteredFavs = userFav.filter((fav: Cocktail) => fav.id !== cocktail.id);
      sessionStorage.setItem('favouritecocktails', JSON.stringify(filteredFavs));
    } else {
      alert(`This is not a favourite yet.`);
    }
    this.checkFavourites();
  }

  getIngredients(cocktail: any): string[] {
    let ingredients: string[] = [];

    if (!cocktail) {
      return ingredients;
    }

    for (let i = 1; i <= 6; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  formatIngredientURL(ingredient: string): string {
    let formattedIngredient: string = this.capitalizeFirst.transform(ingredient)
    return `/juxbar/detailledingredient/${formattedIngredient}`;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
