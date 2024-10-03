import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SoftDrink} from "../../../../core/models/softDrink";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SoftDrinkService} from "../../../../core/services/softDrinkService";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {CapitalizeFirstPipe} from "../../../../capitalize-first.pipe";
import {FavouriteService} from "../../../../core/services/favourite.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-single-soft-drink',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './single-soft-drink.component.html',
  styleUrl: './single-soft-drink.component.scss'
})
export class SingleSoftDrinkComponent implements OnInit, OnDestroy {

  @Input() softDrink!: SoftDrink;
  imageLoaded: { [key: string]: boolean } = {};
  showModal: boolean = false;
  id!: number;
  isFavourite: boolean = false;
  private destroy$ = new Subject<void>();
  protected readonly environment = environment;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private softDrinkService: SoftDrinkService,
              private favouriteService: FavouriteService,
              private capitalizeFirst: CapitalizeFirstPipe) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.softDrinkService.getOneById('softdrink',this.id).subscribe(data => {
      this.softDrink = data;
      this.checkFavourites();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkFavourites() {
    let userFav = JSON.parse(sessionStorage.getItem('favouritesoftdrinks') || '[]');
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

  truncateText(text: string, maxLength: number) {
    return (text.length > maxLength) ? text.substring(0, maxLength) + "..." : text;
  }

  getIngredients(softDrink: any): string[] {
    let ingredients: string[] = [];
    if (!softDrink) {
      return ingredients;
    }
    for (let i = 1; i <= 7; i++) {
      const ingredient = softDrink[`strIngredient${i}`];
      if (ingredient) ingredients.push(ingredient);
    }
    return ingredients;
  }

  formatIngredientURL(ingredient: string): string {
    let formattedIngredient: string = this.capitalizeFirst.transform(ingredient);
    return `/juxbar/detailledingredient/${formattedIngredient}`;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goBack() {
    this.router.navigateByUrl("/juxbar/listallsofts");
  }
}
