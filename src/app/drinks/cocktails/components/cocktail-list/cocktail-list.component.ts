import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {
  BehaviorSubject,
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
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle, ViewportScroller} from "@angular/common";
import {CocktailComponent} from "../cocktail/cocktail.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {animate, animation, query, stagger, style, transition, trigger} from "@angular/animations";
import {Ingredient} from "../../../../core/models/ingredient";


@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  animations: [
    trigger('simpleFadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
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

  alphabet: string[] = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  lastAnchorLetter = '';
  @Input() cocktail !: Cocktail;
  cocktails$!: Observable<Cocktail[]>;
  cocktailForm!: FormGroup;
  id!: number;
  isLoading: boolean = true;
  protected readonly animation = animation;
  private cocktailsSubject = new BehaviorSubject<Cocktail[]>([]);
  private destroy$ = new Subject<void>();

  constructor(private scroller: ViewportScroller, private cocktailService: CocktailService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.cocktailService.getCocktailsPaginated().pipe(
      takeUntil(this.destroy$),
      tap(data => this.cocktailsSubject.next(data)),
      finalize(() => this.isLoading = false))
      .subscribe();

    this.cocktailForm = this.formBuilder.group({
      strDrink: '',
      strFirstIngredient: '',
      strSecondIngredient: '',
      strThirdIngredient: ''

    });

    this.cocktails$ = this.cocktailForm.valueChanges.pipe(
      startWith({strDrink: '', strFirstIngredient: '', strSecondIngredient: '', strThirdIngredient: ''}),
      debounceTime(400),
      distinctUntilChanged(),
      map(formValue => this.filterCocktails(formValue.strDrink, [
        formValue.strFirstIngredient,
        formValue.strSecondIngredient,
        formValue.strThirdIngredient,
      ])),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByCocktails(index: number, cocktail: Cocktail): number {
    return cocktail.id;
  }

  shouldAddAnchor(cocktailName: string): boolean {
    const currentFirstLetter = cocktailName[0].toUpperCase();
    if (currentFirstLetter !== this.lastAnchorLetter) {
      this.lastAnchorLetter = currentFirstLetter;
      return true;
    }
    return false;
  }

  getAnchorId(cocktailName: string): string {
    return cocktailName[0].toUpperCase();
  }

  goToLetter(letter: string) {
    letter = letter == '#' ? 'top'
      : letter;
    if (letter == 'top') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(letter);
      if (element) {

        element.scrollIntoView({behavior: 'smooth'});
      }

    }

  }

  private filterCocktails(searchText: string, searchIngredient: string[]): Cocktail[] {
    return this.cocktailsSubject.value
      .filter(cocktail => {
        const textMatch = !searchText || cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase());
        const ingredientMatch = searchIngredient.every(ingredient =>
          ingredient ? this.ingredientMatches(cocktail, ingredient) : true);
        return textMatch && ingredientMatch;
      })
      .map(cocktail => ({...cocktail, _uniqueKey: Date.now() + Math.random()}));
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
