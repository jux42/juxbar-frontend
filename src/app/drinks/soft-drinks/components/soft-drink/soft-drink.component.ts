import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SoftDrink} from "../../../../core/models/softDrink";
import {map, Observable, Subject} from "rxjs";
import {SoftDrinkService} from "../../../../core/services/softDrinkService";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../core/login/auth-service";

@Component({
  selector: 'app-soft-drink',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink,

  ],
  templateUrl: './soft-drink.component.html',
  styleUrl: './soft-drink.component.scss'
})

export class SoftDrinkComponent implements OnInit, OnDestroy {

  @Input() softDrink !: SoftDrink;
  softDrink$!: Observable<SoftDrink>;
  imageData!: Response;
  id!: number;
  private destroy$ = new Subject<void>();

  @Output() elementVisible = new EventEmitter<SoftDrink>();
  protected readonly SoftDrink = SoftDrink;
  protected readonly environment = environment;
  imageLoaded: {[key: string]: boolean} = {};
  isFavourite: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthService) {
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
    let userFav = JSON.parse(localStorage.getItem('favouritesoftdrinks') || '[]');
    console.log(userFav);
    this.isFavourite = userFav.some((fav: any) => fav.id === this.softDrink.id);
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

  getIngredients(softDrink: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = softDrink[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }
}
