import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {SoftDrink} from "../../core/models/softDrink";
import {SoftDrinkService} from "../../core/services/softDrinkService";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {SoftDrinkComponent} from "../../drinks/soft-drinks/components/soft-drink/soft-drink.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepages',
  standalone: true,
  imports: [
    AsyncPipe,
    SoftDrinkComponent,
    NgForOf,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './softdrink-homepage.component.html',
  styleUrl: './softdrink-homepage.component.scss'
})
export class SoftdrinkHomepageComponent implements OnInit {

  softDrinks$!: Observable<SoftDrink[]>;
  currentClass!: string;

  constructor(private softDrinkService: SoftDrinkService, private router: Router) {}

  ngOnInit(): void {
    this.softDrinks$ = this.getRandomSoftDrinks();
  }

  goToSoftDrink(id: number) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.router.navigateByUrl(`juxbar/onesoftdrink/${id}`)

  }

  getRandomSoftDrinks(): Observable<SoftDrink[]> {
    const randomIds = Array.from({ length: 58 }, () => Math.floor(Math.random() * 58) + 1);
    const requests = randomIds.map(id => this.softDrinkService.getOneSoftDrinkById(id));
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
