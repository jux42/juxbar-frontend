import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {CocktailService} from "../../../../core/services/cocktailService";
import {Observable, Subject} from "rxjs";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, TitleCasePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {UserRequest} from "../../../../core/models/UserRequest";
import {AuthService} from "../../../../core/login/auth-service";
import {PersonalCocktail} from "../../../../core/models/personal-cocktail";
import {FavouriteService} from "../../../../core/services/favourite.service";

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    NgStyle,
    NgClass
  ],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent implements OnInit, OnDestroy {

  @Input() cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!: number;
  imageLoaded: { [key: string]: boolean } = {};
  isFavourite: boolean = false;
  isFavourite$!: Observable<boolean>;
  @Input() userRequest!: UserRequest
  mouseIsOn: boolean = false;
  protected readonly environment = environment;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private authService: AuthService,
              private cocktailService: CocktailService,
              private favouriteService: FavouriteService) {
  }

  ngOnInit() {


    if (this.cocktail) {

      this.checkFavourites();
      this.cdr.detectChanges();
    }
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  checkFavourites() {
    let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
    // console.log(userFav);
    this.isFavourite = userFav.some((fav: any) => fav.id === this.cocktail.id);
  }

  onAddFavouriteCocktail(cocktail: Cocktail): void {
    if (sessionStorage.getItem('username') == null) {
      this.router.navigate(['/login']);

    } else {

      if (!this.isFavourite) {
        let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
        this.cocktailService.addFavouriteCocktail(cocktail.id).subscribe(
          fav => {
            this.isFavourite = true;
          }
        );
        userFav.push(this.cocktail);
        sessionStorage.setItem('favouritecocktails', JSON.stringify(userFav));
      } else {
        alert("This is already a fav");
      }
      this.checkFavourites();
      this.cdr.detectChanges();

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

  onRemoveFavouriteCocktail(cocktail: Cocktail): void {
    if (this.isFavourite) {
      let userFav = JSON.parse(sessionStorage.getItem('favouritecocktails') || '[]');
      this.cocktailService.removeFavouriteCocktail(cocktail.id).subscribe(
        fav => {
          this.isFavourite = false;
          this.favouriteService.announceFavouriteRemoved(cocktail.id, 'cocktail');
        }
      );

      const filteredFavs = userFav.filter((fav: Cocktail) => {
        fav != cocktail
      })
      sessionStorage.setItem('favouritecocktails', JSON.stringify(filteredFavs));
    } else {
      alert("This is NOT a fav yet");
    }
    this.checkFavourites();
    this.cdr.detectChanges();
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


  protected readonly PersonalCocktail = PersonalCocktail;
}
