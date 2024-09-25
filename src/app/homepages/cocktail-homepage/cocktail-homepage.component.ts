import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, switchMap, tap} from "rxjs";
import {Cocktail} from "../../core/models/cocktail";
import {CocktailService} from "../../core/services/cocktailService";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CocktailComponent} from "../../drinks/cocktails/components/cocktail/cocktail.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-homepages',
  standalone: true,
  imports: [
    AsyncPipe,
    CocktailComponent,
    NgForOf,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './cocktail-homepage.component.html',
  styleUrl: './cocktail-homepage.component.scss'
})
export class CocktailHomepageComponent implements OnInit {

  cocktails$!: Observable<Cocktail[]>;
  classes: string[] = [];
  index!: number;
  cocktailsArraySize!: number;
  protected readonly environment = environment;

  constructor(private cocktailService: CocktailService, private router: Router) {
  }

  ngOnInit(): void {
    this.cocktails$ = this.getRandomCocktails();
    this.initializeClasses();
  }

  goToCocktail(id: number) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.router.navigateByUrl(`juxbar/onecocktail/${id}`)

  }

  getCocktailsArraySize(): Observable<number> {
    return this.cocktailService.getCocktailsArraySize().pipe(
      tap(size => this.cocktailsArraySize = size)
    );
  }

  getRandomCocktails(): Observable<Cocktail[]> {
    return this.getCocktailsArraySize().pipe(
      switchMap(arraySize => {
        const randomIds = Array.from({ length: 36 }, () => Math.floor(Math.random() * arraySize));
        const requests = randomIds.map(id => this.cocktailService.getOneCocktailById(id));
        return forkJoin(requests);
      }),
      map((cocktails: Cocktail[]) => cocktails.filter(cocktail => cocktail != null && cocktail.id != null))
    );
  }

  initializeClasses(): void {
    this.classes = [
      'tiny', 'small', 'medium', 'tiniest', 'tiny', 'small', 'large', 'tiny', 'medium', 'small',
      'tiniest', 'small', 'tiny', 'medium', 'tiny', 'tiny', 'tiny', 'small', 'medium', 'tiniest',
      'tiny', 'small', 'medium', 'tiniest', 'tiny', 'tiny', 'small', 'medium', 'large', 'small',
      'tiny', 'tiny', 'small', 'tiniest', 'medium', 'medium', 'small', 'tiny', 'medium', 'tiniest',
      'small', 'tiny', 'tiny', 'small', 'medium', 'tiniest', 'tiny', 'medium', 'small', 'large',
      'tiny', 'tiny', 'small', 'tiniest', 'medium', 'tiny', 'small', 'medium', 'tiniest', 'tiny',
      'tiny', 'small', 'medium', 'tiniest', 'tiny', 'small', 'tiny', 'small', 'medium', 'tiny',
      'tiny', 'tiniest', 'tiny', 'small', 'medium', 'tiniest', 'tiny', 'small', 'medium', 'large',
      'tiniest', 'small', 'tiny', 'tiny', 'small', 'medium', 'tiniest', 'tiny', 'small', 'tiny',
      'tiniest', 'tiny', 'small', 'medium', 'tiny', 'small', 'tiny', 'medium', 'tiniest', 'tiny',
      'small', 'medium', 'tiniest', 'tiny', 'small', 'medium', 'tiny', 'tiniest', 'small', 'tiny',
      'small', 'tiny', 'medium', 'tiniest', 'small', 'tiny', 'tiny', 'small', 'medium', 'medium'
    ];
  }

  getClass(index: number): string {
    return this.classes[index % this.classes.length];
  }


}
