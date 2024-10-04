import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router, RouterLink} from "@angular/router";
import {CocktailService} from "../../services/cocktailService";
import {CocktailComponent} from "../../../drinks/cocktails/components/cocktail/cocktail.component";
import {Cocktail} from "../../models/cocktail";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {IngredientService} from "../../services/ingredientService";
import {FormsModule} from "@angular/forms";
import {firstValueFrom, map} from "rxjs";
import {Ingredient} from "../../models/ingredient";
import {CapitalizeFirstPipe} from "../../../capitalize-first.pipe";
import {AdminService} from "../../services/admin.service";

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
        style({transform: 'translateX(100%)'}),
        animate('400ms ease-out', style({transform: 'translateX(0)'}))
      ])
    ])
  ]
})
export class SideBarComponent implements OnInit {

  multiplier!: number;
  cocktailOfTheDayId!: number;
  cocktail!: Cocktail;
  ingredientsList!: Ingredient[];
  ingredient!: Ingredient;
  protected readonly environment = environment;

  protected readonly sessionStorage = sessionStorage;

  constructor(private router: Router,
              private ngZone: NgZone,
              private cocktailService: CocktailService,
              private ingredientService: IngredientService,
              private adminService: AdminService,
              private cdr: ChangeDetectorRef,
              private capitalizeFirst: CapitalizeFirstPipe) {
  }

  ngOnInit() {

    this.getArraySize();
    //TODO: ID de référence aligné sur l'ID max en BDD ==> créer une méthode pour récupérer ID max
    this.cocktailOfTheDayId = this.cocktailService.getCocktailOfTheDay(569);
    console.log(this.cocktailOfTheDayId)
    this.cocktailService.getOneById('cocktail',this.cocktailOfTheDayId).pipe(
      map(
        data => this.cocktail = data
      )
    ).subscribe();


    this.ingredientService.getAllIngredients().subscribe(
      data => this.ingredientsList = data
    )
  }

  onGoToCocktailsAlpha() {

    this.router.navigate(['/juxbar/listall']);

  }

  onGoToSoftdrinksAlpha() {
    this.router.navigateByUrl('/juxbar/listallsofts', {skipLocationChange: true});
  }

  goToIngredient(ingredientString: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      const formattedIngredient = this.capitalizeFirst.transform(ingredientString);
      this.router.navigate([`juxbar/detailledingredient/${formattedIngredient}`]);
    });
  }

  getArraySize(){
    return this.cocktailService.getCocktailsArraySize().pipe(
      map(arraySize => this.multiplier = arraySize),
    ).subscribe()
  }

  getSecureRandomInt(max: number): number {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  onGoToRandomCocktail() {


    console.log("array size : " + this.multiplier);

    let randomCocktailId = this.getSecureRandomInt(this.multiplier);
    console.log(randomCocktailId);


    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    this.reloadComponent(`juxbar/onecocktail/${randomCocktailId}`);

  }

  onGoToCocktailOfTheDay(id: number) {

    this.reloadComponent(`juxbar/onecocktail/${id}`);

  }

  onCreateCocktail() {
    this.router.navigate(['juxbar/profile/createcocktail']);
  }



  async onListUsers() {

    try {
      const users = await firstValueFrom(this.adminService.listUsers());
      console.log(users);
    } catch (error) {
      console.error('An error occurred while fetching users:', error);
    }
  }



  reloadComponent(page: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`${page}`]);
    });
  }
}


