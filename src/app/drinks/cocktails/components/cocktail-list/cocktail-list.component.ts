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
  Subject, takeUntil,
  tap
} from "rxjs";
import {CocktailService} from "../../../../core/services/cocktailService";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf, ViewportScroller} from "@angular/common";
import {CocktailComponent} from "../cocktail/cocktail.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {slideInAnimation} from "../../../../animations";
import {animate, animation, query, stagger, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  animations: [
    slideInAnimation,
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0.2 }),
          stagger('10ms', animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })))
        ], { optional: true })
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
   ],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {

  alphabet: string[] =['#','A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  lastAnchorLetter = '';

  @Input() cocktail !: Cocktail;
  cocktails$!: Observable<Cocktail[]>;
  cocktailForm!: FormGroup;
  id!: number;
  isLoading: boolean = true;
  private cocktailsSubject = new BehaviorSubject<Cocktail[]>([]);

  private destroy$ = new Subject<void>();


  constructor(private scroller: ViewportScroller, private cocktailService: CocktailService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  ngOnInit() {


    this.cocktailService.getAllCocktailsCached().pipe(
      takeUntil(this.destroy$),
      tap(data=>this.cocktailsSubject.next(data)),
      finalize(()=>this.isLoading=false))
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
        formValue.strThirdIngredient
      ])),
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  trackByCocktails(index: number, cocktail: Cocktail): number {
    return cocktail.id; // ou une autre propriété unique
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

  goDown(letter: string) {
    letter = letter == '#' ? 'top'
      :letter;
    const element = document.getElementById(letter);
    if (element) {

      element.scrollIntoView({ behavior: 'smooth' });
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

  protected readonly animation = animation;
}
