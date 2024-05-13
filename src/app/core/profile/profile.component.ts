import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../login/auth-service";
import {Router} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PersonalCocktailComponent} from "../../drinks/personal-cocktail/personal-cocktail.component";
import {CocktailComponent} from "../../drinks/cocktails/components/cocktail/cocktail.component";
import {CocktailService, PersonalCocktailService} from "../services/cocktailService";
import {PersonalCocktail} from "../models/personal-cocktail";
import {slideInAnimation} from "../../animations";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {SoftDrink} from "../models/softDrink";
import {SoftDrinkService} from "../services/softDrinkService";
import {SoftDrinkComponent} from "../../drinks/soft-drinks/components/soft-drink/soft-drink.component";


@Component({
  selector: 'app-profile',
  standalone: true,
  animations: [
    slideInAnimation,
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          stagger('10ms', animate('700ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })))
        ], { optional: true })
      ])
    ])

  ],
  imports: [
    NgIf,
    PersonalCocktailComponent,
    CocktailComponent,
    NgForOf,
    AsyncPipe,
    NgClass,
    SoftDrinkComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'

})
export class ProfileComponent implements OnInit{

  userName!: string | null;
  loggedIn: boolean = false;
  invite!: string;

  isLoading: boolean = true;

  @Input() personalCocktail!: PersonalCocktail;

  personalCocktails!: PersonalCocktail[];

  favouriteCocktails!: Cocktail[];
  favouriteSoftDrinks!: SoftDrink[];
  favouriteCocktails$ !: Observable<Cocktail[]>
  favouriteSoftDrinks$ !: Observable<SoftDrink[]>

  constructor(private authService: AuthService,
              private router: Router,
              private personalCocktailService : PersonalCocktailService,
              private cocktailService: CocktailService,
              private softDrinkService: SoftDrinkService) {
  }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.checkLoggedIn();
    this.loadPersonalCocktails();

    if (this.loggedIn) {
      console.log(this.loggedIn)
      this.loadPersonalCocktails();
      this.loadFavouriteCocktails();
      this.loadFavouriteSoftDrinks();

    }


  }

  loadPersonalCocktails() {
    this.personalCocktailService.getAllPersonalCocktails().subscribe({
      next: (cocktails) => {
        this.personalCocktails = cocktails;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading personal cocktails', error);
        this.isLoading = false;
      }
    });

  }

  loadFavouriteCocktails() {

    this.cocktailService.getFavouriteCocktails().subscribe({

      next: (favCocktails) => {
        if (!favCocktails) favCocktails = [];
        this.favouriteCocktails = favCocktails;
      },
      error: (error) => {
        console.error('No cocktails to load', error);
        this.isLoading = false;
      }
    })

  }


  loadFavouriteSoftDrinks() {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.softDrinkService.getFavouriteSoftDrinks()?.subscribe({

          next: (favSoftDrinks) => {
            if (!favSoftDrinks) favSoftDrinks = [];
            this.favouriteSoftDrinks = favSoftDrinks;
          },
          error: (error) => {
            console.error('no softdrinks to load', error);
            this.isLoading = false;
          }
        })
      }
    });
  }





  checkLoggedIn(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.authService.getUsername().subscribe(username => {
      this.userName = username;
    });
  }



}
