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
import {firstValueFrom, forkJoin, map} from "rxjs";
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

    //TODO: ID de référence aligné sur l'ID max en BDD ==> créer une méthode pour récupérer ID max
    this.cocktailOfTheDayId = this.cocktailService.getCocktailOfTheDayId(569);
    console.log(this.cocktailOfTheDayId)
    this.cocktailService.getOneCocktailById(this.cocktailOfTheDayId).pipe(
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

  onGoToRandomCocktail() {
    let randomCocktailId = Math.floor(Math.random() * 570);
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

  onDevUpdate() {
    forkJoin(this.cocktailService.updateAllListsFromExtAPI()).subscribe(
      (responses) => {
        responses.forEach(response => {
          console.log(response); // Log each response
          alert(`Update successful: ${response}`);

        });
      },
      (error) => {
        console.error('An error occurred:', error);
        alert(`An error occurred: ${error.message}`);
      }
    );
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


