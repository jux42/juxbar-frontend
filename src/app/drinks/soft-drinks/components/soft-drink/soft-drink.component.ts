import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SoftDrink} from "../../../../core/models/softDrink";
import {Observable, Subject} from "rxjs";
import {SoftDrinkService} from "../../../../core/services/softDrinkService";
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../core/login/auth-service";
import {FavouriteService} from "../../../../core/services/favourite.service";

@Component({
  selector: 'app-soft-drink',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink,
    NgClass,

  ],
  templateUrl: './soft-drink.component.html',
  styleUrl: './soft-drink.component.scss'
})

export class SoftDrinkComponent implements OnInit, OnDestroy {

  @Input() softDrink !: SoftDrink;
  softDrink$!: Observable<SoftDrink>;
  imageData!: Response;
  id!: number;
  mouseIsOn: boolean = false;
  @Output() elementVisible = new EventEmitter<SoftDrink>();
  imageLoaded: { [key: string]: boolean } = {};
  isFavourite: boolean = false;
  protected readonly SoftDrink = SoftDrink;
  protected readonly environment = environment;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private authService: AuthService,
              private softDrinkService: SoftDrinkService,
              private favouriteService: FavouriteService) {
  }

  ngOnInit() {
    if (this.softDrink) {
      this.checkFavourites();
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkFavourites() {
    let userFav = JSON.parse(sessionStorage.getItem('favouritesoftdrinks') || '[]');
    console.log(userFav);
    this.isFavourite = userFav.some((fav: any) => fav.id === this.softDrink.id);
  }

  onAddFavouriteSoftDrink(softDrink: SoftDrink): void {
    if (sessionStorage.getItem('username') == null) {
      this.router.navigate(['/login']);
    } else {
      if (!this.isFavourite) {
        let userFav = JSON.parse(sessionStorage.getItem('favouritesoftdrinks') || '[]');
        this.softDrinkService.addFavouriteSoftDrink(softDrink.id).subscribe(() => {
          this.isFavourite = true;
        });
        userFav.push(this.softDrink);
        sessionStorage.setItem('favouritesoftdrinks', JSON.stringify(userFav));
      } else {
        alert("This is already a favourite.");
      }
      this.checkFavourites();
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

  onRemoveFavouriteSoftDrink(softDrink: SoftDrink): void {
    if (this.isFavourite) {
      let userFav = JSON.parse(sessionStorage.getItem('favouritesoftdrinks') || '[]');
      this.softDrinkService.removeFavouriteSoftDrink(softDrink.id).subscribe(() => {
        this.isFavourite = false;
        this.favouriteService.announceFavouriteRemoved(softDrink.id, 'softDrink');
      });

      const filteredFavs = userFav.filter((fav: SoftDrink) => fav.id !== softDrink.id);
      sessionStorage.setItem('favouritesoftdrinks', JSON.stringify(filteredFavs));
    } else {
      alert("This is not a favourite yet.");
    }
    this.checkFavourites();
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  goToSoftDrink() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.router.navigateByUrl(`juxbar/onesoftdrink/${this.softDrink.id}`);

  }

  getIngredients(cocktail: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredientKey = `strIngredient${i}`;
      const ingredient = cocktail[ingredientKey];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }
}
