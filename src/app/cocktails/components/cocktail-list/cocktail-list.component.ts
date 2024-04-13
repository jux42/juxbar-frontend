import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {CocktailService} from "../../../core/services/cocktailService";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CocktailComponent} from "../cocktail/cocktail.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {slideInAnimation} from "../../../animations";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  animations: [
    slideInAnimation,
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':leave', [
          stagger('30ms', animate('500ms ease-in', style({ transform: 'translateY(100%)', opacity: 0.5 })))
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 90 }),
          stagger('30ms', animate('800ms 500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })))
        ], { optional: true })
      ])
    ])

  ],
  imports: [

    NgForOf,
    CocktailComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  @Input() cocktail !: Cocktail;
  cocktails$!: Observable<Cocktail[]>;
  cocktailForm!: FormGroup;
  id!: number;
  private cocktailsSubject = new BehaviorSubject<Cocktail[]>([]);

  constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cocktailForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''

    });

    this.cocktailService.getAllCocktails().subscribe(data => {
      this.cocktailsSubject.next(data);

    });

    this.cocktails$ = this.cocktailForm.valueChanges.pipe(
      startWith({strDrink: '', strFirstIngredient: '', strSecondIngredient: '', strThirdIngredient: ''}),
      debounceTime(400),
      distinctUntilChanged(),
      map(formValue => this.filterCocktails(formValue.strDrink, [
        formValue.strFirstIngredient,
        formValue.strSecondIngredient,
        formValue.strThirdIngredient
      ])),
    );
  }

  private filterCocktails(searchText: string, searchIngredient: string[]): Cocktail[] {
    return this.cocktailsSubject.value
      .filter(cocktail => {
        const textMatch = !searchText || cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase());
        const ingredientMatch = searchIngredient.every(ingredient =>
          ingredient ? this.ingredientMatches(cocktail, ingredient) : true);
        return textMatch && ingredientMatch;
      })
      .map(cocktail=> ({...cocktail, _uniqueKey: Date.now() + Math.random()}))
  }

  private ingredientMatches(cocktail: Cocktail, searchIngredient: string): boolean {
    for (let i = 1; i <= 6; i++) {
      const ingredient = (cocktail as any)[`strIngredient${i}`];
      if (ingredient && ingredient.toLowerCase().includes(searchIngredient.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}
