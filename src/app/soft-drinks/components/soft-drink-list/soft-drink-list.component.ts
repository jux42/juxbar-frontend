import {Component, Input, OnInit} from '@angular/core';
import {SoftDrink} from "../../../core/models/softDrink";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SoftDrinkService} from "../../../core/services/softDrinkService";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CocktailComponent} from "../../../cocktails/components/cocktail/cocktail.component";
import {SoftDrinkComponent} from "../soft-drink/soft-drink.component";
import {slideInAnimation} from "../../../animations";

@Component({
  animations: [slideInAnimation],
  selector: 'app-soft-drink-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CocktailComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    SoftDrinkComponent
  ],

  templateUrl: './soft-drink-list.component.html',
  styleUrl: './soft-drink-list.component.css'
})
export class SoftDrinkListComponent implements OnInit {
  @Input() softDrink !: SoftDrink;
  softDrinks$!: Observable<SoftDrink[]>;
  softDrinks!: SoftDrink[];
  softDrinkForm!: FormGroup;
  softDrinkFilter$!: Observable<SoftDrink>
  id!: number;
  private softDrinksSubject = new BehaviorSubject<SoftDrink[]>([]);

  constructor(private softDrinkService: SoftDrinkService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.softDrinkForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''

    });

    this.softDrinkService.getAllSoftDrinks().subscribe(data => {
      this.softDrinksSubject.next(data);

    });

    this.softDrinks$ = this.softDrinkForm.valueChanges.pipe(
      startWith({strDrink: '', strFirstIngredient: '', strSecondIngredient: '', strThirdIngredient: ''}),
      debounceTime(400),
      distinctUntilChanged(),
      map(formValue => this.filterSoftDrinks(formValue.strDrink, [
        formValue.strFirstIngredient,
        formValue.strSecondIngredient,
        formValue.strThirdIngredient
      ])),
    );
  }

  private filterSoftDrinks(searchText: string, searchIngredient: string[]): SoftDrink[] {
    return this.softDrinksSubject.value.filter(softDrink => {
      const textMatch = !searchText || softDrink.strDrink.toLowerCase().includes(searchText.toLowerCase());
      const ingredientMatch = searchIngredient.every(searchIngredient => searchIngredient ? this.ingredientMatches(softDrink, searchIngredient) : true);
      return textMatch && ingredientMatch;
    });
  }

  private ingredientMatches(softDrink: SoftDrink, searchIngredient: string): boolean {
    for (let i = 1; i <= 6; i++) {
      const ingredient = (softDrink as any)[`strIngredient${i}`];
      if (ingredient && ingredient.toLowerCase().includes(searchIngredient.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

}

