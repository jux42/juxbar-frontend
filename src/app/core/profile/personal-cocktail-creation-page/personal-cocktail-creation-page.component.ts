import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonalCocktailService} from "../../services/cocktailService";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-personal-cocktail-creation-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './personal-cocktail-creation-page.component.html',
  styleUrl: './personal-cocktail-creation-page.component.scss'
})
export class PersonalCocktailCreationPageComponent implements OnInit{

  personalCocktailForm!: FormGroup;
  username!: string | null;
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder, private personalCocktailService: PersonalCocktailService, private router: Router) {
  }

ngOnInit() {

  this.username = localStorage.getItem('username');
  this.urlRegex = this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

  this.personalCocktailForm = this.formBuilder.group({
    strDrink: ['', Validators.required],
    strDrinkThumb: ['', Validators.required, Validators.pattern(this.urlRegex)],
    strIngredient1: ['', Validators.required],
    strIngredient2: ['', Validators.required],
    strIngredient3: ['', Validators.required],
    strIngredient4: ['', Validators.required],
    strIngredient5: ['', Validators.required],
    strIngredient6: ['', Validators.required],
    strInstructions: ['', Validators.required],

  });
  //TODO : reactive template
}
onSubmitForm(): void{
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
     tap(()=>this.router.navigateByUrl('juxbar/profile')))
    .subscribe();
}
}
