import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {FavouriteService} from "../../core/services/favourite.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  standalone: true,
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit, OnDestroy {
  @Input() drink!: any;
  @Input() drinkType!: string;
  @Input() favouritesKey!: string;
  imageLoaded: { [key: string]: boolean } = {};
  isFavourite: boolean = false;
  mouseIsOn: boolean = false;
  protected readonly environment = environment;
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private router: Router, private favouriteService: FavouriteService) {
  }

  ngOnInit() {
    this.checkFavourites();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkFavourites() {
    let userFav = JSON.parse(sessionStorage.getItem(this.favouritesKey) || '[]');
    this.isFavourite = userFav.some((fav: any) => fav.id === this.drink.id);
  }

  onAddFavouriteDrink() {
    if (!this.isFavourite) {
      let userFav = JSON.parse(sessionStorage.getItem(this.favouritesKey) || '[]');
      this.favouriteService.addFavouriteDrink(this.drink.id, this.drinkType).subscribe(() => {
        this.isFavourite = true;
        userFav.push(this.drink);
        sessionStorage.setItem(this.favouritesKey, JSON.stringify(userFav));
        this.checkFavourites();
      });
    } else {
      alert("This is already a fav");
    }
  }

  onRemoveFavouriteDrink() {
    if (this.isFavourite) {
      let userFav = JSON.parse(sessionStorage.getItem(this.favouritesKey) || '[]');
      this.favouriteService.removeFavouriteDrink(this.drink.id, this.drinkType).subscribe(() => {
        this.isFavourite = false;
        sessionStorage.setItem(this.favouritesKey, JSON.stringify(userFav.filter((fav: any) => fav.id !== this.drink.id)));
        this.checkFavourites();
      });
    } else {
      alert("This is NOT a fav yet");
    }
  }

  goToDrink() {
    this.router.navigateByUrl(`/juxbar/one${this.drinkType}/${this.drink.id}`);
  }
}
