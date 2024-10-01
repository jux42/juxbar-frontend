import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonalCocktailService} from "../../services/cocktailService";
import {Router} from "@angular/router";
import {catchError, last, map, Observable, of, tap} from "rxjs";
import {Cocktail} from "../../models/cocktail";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {CocktailComponent} from "../../../drinks/cocktails/components/cocktail/cocktail.component";
import {environment} from "../../../../environments/environment";
import {IngredientService} from "../../services/ingredientService";
import {Ingredient} from "../../models/ingredient";
import {MagicNumerFileValidationService} from "../../services/magic-numer-file-validation.service";
import {PersonalCocktail} from "../../models/personal-cocktail";

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
  cocktailPreview$!: Observable<PersonalCocktail>;
  ingredientsList!: Ingredient[];
  ingredient!: Ingredient;
  protected readonly environment = environment;
  protected readonly last = last;
  selectedFile!: File;
  imagePreview: string | null = null;

  constructor(private formBuilder: FormBuilder,private magicNumberValidationService : MagicNumerFileValidationService,  private personalCocktailService: PersonalCocktailService, private router: Router, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe(
      data => this.ingredientsList = data
    )

    this.username = sessionStorage.getItem('username');
    this.urlRegex = this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.personalCocktailForm = this.formBuilder.group({
      strDrink: ['', Validators.required],
      localImage: Blob,
      strIngredient1: ['',],
      strIngredient2: ['',],
      strIngredient3: ['',],
      strIngredient4: ['',],
      strIngredient5: ['',],
      strIngredient6: ['',],
      strInstructions: ['',],

    });
    this.cocktailPreview$ = this.personalCocktailForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue
      }))
    )

  }

  onSubmitForm(): void {
    console.log('Local Storage Username:', sessionStorage.getItem('username'));
    if (!this.username) {
      console.error('Username is not defined');
      return;
    }

    const cocktailData = {
      ...this.personalCocktailForm.value,
      ownerName: sessionStorage.getItem('username')
    };
    console.log(cocktailData)

    this.personalCocktailService.savePersonalCocktail(cocktailData).pipe(
      tap(() => {
        if (this.selectedFile) {
          this.magicNumberValidationService.validateFile(this.selectedFile).pipe(
            catchError((error) => {
              console.error("Image validation failed", error);
              return of(false);
            }),
            tap((isValid) => {
              if (isValid) {
                this.personalCocktailService.savePersonalCocktailImage(cocktailData.strDrink, this.selectedFile)
                  .subscribe(() => this.router.navigateByUrl('juxbar/profile'));
              }
            })
          ).subscribe();
        } else {
          this.router.navigateByUrl('juxbar/profile');
        }
      })
    ).subscribe();


  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: this.selectedFile?.type });

        const objectURL = URL.createObjectURL(blob);
        this.imagePreview = objectURL;
      };

    }
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
}
