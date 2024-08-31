import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Cocktail} from "../../core/models/cocktail";
import {CocktailService} from "../../core/services/cocktailService";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CocktailComponent} from "../../drinks/cocktails/components/cocktail/cocktail.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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
  currentClass!: string;

  constructor(private cocktailService: CocktailService, private router: Router) {}

  ngOnInit(): void {
    this.cocktails$ = this.getRandomCocktails();
  }

  goToCocktail(id: number) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.router.navigateByUrl(`juxbar/onecocktail/${id}`)

  }

  getRandomCocktails(): Observable<Cocktail[]> {
    const randomIds = Array.from({ length: 100 }, () => Math.floor(Math.random() * 569) + 1);
    const requests = randomIds.map(id => this.cocktailService.getOneCocktailById(id));
    return forkJoin(requests);
  }
  getRandomDelay(): string {
    const minDelay = 0;
    const maxDelay = 2; // Maximum 2 secondes de délai
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    return `${delay}s`; // Retourne un délai sous forme de chaîne de caractères
  }

  getRandomDuration(): string {
    const minDuration = 3;
    const maxDuration = 6; // Durée entre 3 et 6 secondes
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    return `${duration}s`; // Retourne une durée sous forme de chaîne de caractères
  }

  getRandomClass(): string {
    const classes = [
      'tiny','tiny','tiny','tiny','tiny','tiny','tiny','tiny',
      'small','small','small','small',
      'medium','medium','medium',
      'large',
    ];
    let newClass = classes[Math.floor(Math.random() * classes.length)];

    while ( this.currentClass == newClass ) {
      newClass = classes[Math.floor(Math.random() * classes.length)];
    }
    this.currentClass = newClass;
    return this.currentClass;
  }

  protected readonly environment = environment;
}
