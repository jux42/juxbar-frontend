import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router, RouterLink} from "@angular/router";
import {CocktailService} from "../../services/cocktailService";
import {CocktailComponent} from "../../../drinks/cocktails/components/cocktail/cocktail.component";
import {Cocktail} from "../../models/cocktail";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {IngredientService} from "../../services/ingredientService";
import {FormsModule} from "@angular/forms";
import {map} from "rxjs";
import {Ingredient} from "../../models/ingredient";
import {CapitalizeFirstPipe} from "../../../capitalize-first.pipe";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CocktailComponent,
    NgIf,
    AsyncPipe,
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [
    trigger('fadeInSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class SideBarComponent implements OnInit{

  cocktailOfTheDayId!: number;
  cocktail!: Cocktail;
  ingredientsList!: Ingredient[];
  ingredient!: Ingredient;
  ingredientString!: string;

  constructor(private router: Router,
              private cocktailService: CocktailService,
              private ingredientService: IngredientService,
              private cdr: ChangeDetectorRef,
              private capitalizeFirst: CapitalizeFirstPipe) {
  }

  ngOnInit() {

    this.cocktailOfTheDayId = this.cocktailService.getCocktailOfTheDayId(569);
    console.log(this.cocktailOfTheDayId)
    this.cocktailService.getOneCocktailById(this.cocktailOfTheDayId).pipe(
      map(
      data => this.cocktail = data
      )
    ).subscribe();


    this.ingredientService.getAllIngredients().subscribe(
      data=>this.ingredientsList = data
    )
  }

  goToIngredient(ingredientString: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      const formattedIngredient = this.capitalizeFirst.transform(ingredientString);
      this.router.navigate([`juxbar/detailledingredient/${formattedIngredient}`]);
    });
  }


  onGoToRandomCocktail() {
    let randomCocktailId = Math.floor(Math.random() * 570);
    console.log(randomCocktailId);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`juxbar/onecocktail/${randomCocktailId}`]);
    });
  }

  onGoToCocktailOfTheDay(id:number){

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`juxbar/onecocktail/${id}`]);
    });
  }

  onCreateCocktail(){
    this.router.navigate(['juxbar/profile/createcocktail']);
  }

  protected readonly environment = environment;
}


