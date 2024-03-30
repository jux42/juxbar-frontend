import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {CocktailService} from "../../../core/services/cocktailService";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CocktailComponent} from "../cocktail/cocktail.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [
    NgForOf,
    CocktailComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit{
  @Input()   cocktail !: Cocktail;
  cocktails$!: Observable<Cocktail[]>;
  cocktails!: Cocktail[];
  cocktailForm!: FormGroup;
  cocktailFilter$!: Observable<Cocktail>
  private cocktailsSubject = new BehaviorSubject<Cocktail[]>([]);

  id!:number;
  constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cocktailForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''

    });

    this.cocktailService.getAllCocktails().subscribe(data=>{
    this.cocktailsSubject.next(data);

    });



    this.cocktails$ = this.cocktailForm.valueChanges.pipe(
      startWith({ strDrink: '', strFirstIngredient: '' , strSecondIngredient: '', strThirdIngredient: ''}),
      debounceTime(400),
      distinctUntilChanged(),
      map(formValue => this.filterCocktails(formValue.strDrink, [
        formValue.strFirstIngredient,
        formValue.strSecondIngredient,
        formValue.strThirdIngredient
      ] )),
    );
  }

  private filterCocktails(searchText: string, searchIngredient: string[]): Cocktail[] {
    return this.cocktailsSubject.value.filter(cocktail => {
      const textMatch = !searchText || cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase());
      const ingredientMatch = searchIngredient.every(searchIngredient=>  searchIngredient ? this.ingredientMatches(cocktail, searchIngredient): true);
      return textMatch && ingredientMatch;
    });
  }

  private ingredientMatches(cocktail: Cocktail, searchIngredient: string): boolean {
    for (let i = 1; i <= 6; i++) {
      const ingredient  = (cocktail as any)[`strIngredient${i}`];
      if (ingredient && ingredient.toLowerCase().includes(searchIngredient.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}
