import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, Location, NgForOf, NgIf, NgStyle, TitleCasePipe} from "@angular/common";
import {Ingredient} from "../../../core/models/ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../../core/services/ingredientService";
import {BoldWordsPipe} from "../../../core/services/bold-words.pipe";
import {environment} from "../../../../environments/environment";
import {Cocktail} from "../../../core/models/cocktail";
import {SoftDrink} from "../../../core/models/softDrink";
import {CocktailService} from "../../../core/services/cocktailService";
import {SoftDrinkService} from "../../../core/services/softDrinkService";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-ingredient',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    NgForOf,
    BoldWordsPipe,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './single-ingredient.component.html',
  styleUrl: './single-ingredient.component.scss'
})
export class SingleIngredientComponent implements OnInit {
  @Input() ingredient!: Ingredient;
  cocktails$!: Observable<Cocktail[]>;
  softDrinks$!: Observable<SoftDrink[]>;
  imageLoaded: { [key: string]: boolean } = {};


  protected readonly environment = environment;

  constructor(
    private location: Location,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private cocktailService: CocktailService,
    private softDrinkService: SoftDrinkService) {

  }

  ngOnInit(): void {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    const strIngredient: string = this.route.snapshot.params['strIngredient'];
    this.ingredientService.getOneIngredientByName(strIngredient).subscribe(data => {
        this.cocktails$ = this.cocktailService.getCocktailsByIngredient(strIngredient);
        this.softDrinks$ = this.softDrinkService.getSoftDrinkByIngredient(strIngredient);
        this.ingredient = data;


      },
    )

  }

  goToCocktail(cocktail: Cocktail) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.router.navigateByUrl(`juxbar/onecocktail/${cocktail.id}`)
  }

  goToSoftDrink(softDrink: SoftDrink) {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.router.navigateByUrl(`juxbar/onesoftdrink/${softDrink.id}`)

  }

  goBack() {
    this.location.back();
  }
}
