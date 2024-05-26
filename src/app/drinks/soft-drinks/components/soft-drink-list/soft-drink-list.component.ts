import {Component, Input, OnInit} from '@angular/core';
import {SoftDrink} from "../../../../core/models/softDrink";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SoftDrinkService} from "../../../../core/services/softDrinkService";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CocktailComponent} from "../../../cocktails/components/cocktail/cocktail.component";
import {SoftDrinkComponent} from "../soft-drink/soft-drink.component";
import {slideInAnimation} from "../../../../animations";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  animations: [
    slideInAnimation,
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':leave', [
          stagger('30ms', animate('500ms ease-in', style({transform: 'translateY(100%)', opacity: 0.5})))
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(-100%)', opacity: 90}),
          stagger('30ms', animate('800ms 500ms ease-out', style({transform: 'translateX(0)', opacity: 1})))
        ], {optional: true})
      ])
    ])

  ],
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
  styleUrl: './soft-drink-list.component.scss'
})
export class SoftDrinkListComponent implements OnInit {
  alphabet: string[] = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  lastAnchorLetter = '';
  @Input() softDrink !: SoftDrink;
  softDrinks$!: Observable<SoftDrink[]>;
  softDrinkForm!: FormGroup;
  id!: number;
  listLoaded: boolean = false;
  private softDrinksSubject = new BehaviorSubject<SoftDrink[]>([]);

  constructor(private softDrinkService: SoftDrinkService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }


  ngOnInit() {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.softDrinkForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''

    });

    this.softDrinkService.getAllSoftDrinks().subscribe(data => {
      this.softDrinksSubject.next(data)

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

  shouldAddAnchor(softDrinkName: string): boolean {
    const currentFirstLetter = softDrinkName[0].toUpperCase();
    if (currentFirstLetter !== this.lastAnchorLetter) {
      this.lastAnchorLetter = currentFirstLetter;
      return true;
    }
    return false;
  }

  getAnchorId(softDrinkName: string): string {
    return softDrinkName[0].toUpperCase();
  }

  goDown(letter: string) {
    letter = letter == '#' ? 'top'
      : letter;
    const element = document.getElementById(letter);
    if (element) {

      element.scrollIntoView({behavior: 'smooth'});
    }
  }

  private filterSoftDrinks(searchText: string, searchIngredient: string[]): SoftDrink[] {
    return this.softDrinksSubject.value
      .filter(softDrink => {
        const textMatch = !searchText || softDrink.strDrink.toLowerCase().includes(searchText.toLowerCase());
        const ingredientMatch = searchIngredient.every(ingredient =>
          ingredient ? this.ingredientMatches(softDrink, ingredient) : true);
        return textMatch && ingredientMatch;
      })
      .map(sofDrink => ({...sofDrink, _uniqueKey: Date.now() + Math.random()}));
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
