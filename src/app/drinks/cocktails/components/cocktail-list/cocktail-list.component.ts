import {Component, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap
} from "rxjs";
import {CocktailService} from "../../../../core/services/cocktailService";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CocktailComponent} from "../cocktail/cocktail.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  animations: [
    trigger('simpleFadeInAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ],
  imports: [

    NgForOf,
    CocktailComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgClass,
    NgStyle,
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  alphabet: string[] = ['*', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  selectedLetter: string = '*';
  cocktails$!: Observable<Cocktail[]>;
  filteredCocktails$!: Observable<Cocktail[]>;
  cocktailForm!: FormGroup;
  isLoading: boolean = true;
  private cocktailsSubject = new BehaviorSubject<Cocktail[]>([]);
  private letterSubject = new BehaviorSubject<string>(this.selectedLetter);
  private destroy$ = new Subject<void>();

  constructor(private cocktailService: CocktailService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    this.cocktailService.getCocktailsPaginated().pipe(
      takeUntil(this.destroy$),
      tap(data => this.cocktailsSubject.next(data)),
      finalize(() => this.isLoading = false)
    ).subscribe();

    this.cocktailForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''
    });

    this.filteredCocktails$ = combineLatest([
      this.cocktailForm.valueChanges.pipe(startWith(this.cocktailForm.value), debounceTime(400), distinctUntilChanged()),
      this.letterSubject
    ]).pipe(
      map(([formValue, selectedLetter]) => this.filterCocktails(formValue, selectedLetter))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterByLetter(letter: string) {
    this.selectedLetter = letter;
    this.letterSubject.next(letter);
  }

  trackByCocktails(index: number, cocktail: Cocktail): number {
    return cocktail.id;
  }

  private filterCocktails(formValue: any, selectedLetter: string): Cocktail[] {
    const {strDrink, strFirstIngredient, strSecondIngredient, strThirdIngredient} = formValue;
    const searchIngredients = [strFirstIngredient, strSecondIngredient, strThirdIngredient];

    return this.cocktailsSubject.value
      .filter(cocktail => {
        const textMatch = !strDrink || cocktail.strDrink.toLowerCase().includes(strDrink.toLowerCase());
        const ingredientMatch = searchIngredients.every(ingredient =>
          ingredient ? this.ingredientMatches(cocktail, ingredient) : true
        );

        if (selectedLetter === '*') {
          return textMatch && ingredientMatch;
        }

        const letterMatch = selectedLetter === '#' ?
          /^[0-9]/.test(cocktail.strDrink) :
          cocktail.strDrink.startsWith(selectedLetter);

        return textMatch && ingredientMatch && letterMatch;
      });
  }

  private ingredientMatches(cocktail: Cocktail, searchIngredient: string): boolean {
    for (let i = 1; i <= 7; i++) {
      const ingredientName = (cocktail as any)[`strIngredient${i}`];
      if (ingredientName && ingredientName.toLowerCase().includes(searchIngredient.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}
