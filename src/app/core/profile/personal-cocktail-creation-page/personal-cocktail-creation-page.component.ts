import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonalCocktailService} from "../../services/cocktailService";
import {Router} from "@angular/router";
import {last, map, Observable, tap} from "rxjs";
import {Cocktail} from "../../models/cocktail";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {CocktailComponent} from "../../../drinks/cocktails/components/cocktail/cocktail.component";
import {environment} from "../../../../environments/environment";
import {IngredientService} from "../../services/ingredientService";
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'app-personal-cocktail-creation-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    AsyncPipe,
    NgIf,
    CocktailComponent,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './personal-cocktail-creation-page.component.html',
  styleUrl: './personal-cocktail-creation-page.component.scss'
})
export class PersonalCocktailCreationPageComponent implements OnInit {

  mouseIsOn: boolean = false;
  personalCocktailForm!: FormGroup;
  username!: string | null;
  urlRegex!: RegExp;
  cocktailPreview$!: Observable<Cocktail>;
  ingredientsList!: Ingredient[];
  ingredient!: Ingredient;


  constructor(private formBuilder: FormBuilder, private personalCocktailService: PersonalCocktailService, private router: Router, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe(
      data => this.ingredientsList = data
    )

    this.username = localStorage.getItem('username');
    this.urlRegex = this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.personalCocktailForm = this.formBuilder.group({
      strDrink: ['', Validators.required],
      strDrinkThumb: ['', [Validators.pattern(this.urlRegex)]],
      strIngredient1: ['', ],
      strIngredient2: ['', ],
      strIngredient3: ['', ],
      strIngredient4: ['', ],
      strIngredient5: ['', ],
      strIngredient6: ['', ],
      strInstructions: ['',],

    });
  this.cocktailPreview$ = this.personalCocktailForm.valueChanges.pipe(
    map(formValue=>({
      ...formValue
    }))
    )

  }

  onSubmitForm(): void {
    console.log('Local Storage Username:', localStorage.getItem('username'));
    if (!this.username) {
      console.error('Username is not defined');
      return;
    }
    const cocktailData = {
      ...this.personalCocktailForm.value,
      ownerName: localStorage.getItem('username')
    };
    console.log(cocktailData)

    this.personalCocktailService.savePersonalCocktail(cocktailData).pipe(
      tap(() => this.router.navigateByUrl('juxbar/profile')))
      .subscribe();
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
  onImageError(event: any) {
    console.error('Image loading error', event);
  }

  onMouseEnter() {
    this.mouseIsOn = true;
    console.log("mouse enter");
  }

  onMouseLeave() {
    this.mouseIsOn = false;
    console.log("mouse leave");
  }

  protected readonly environment = environment;
  protected readonly last = last;
}
