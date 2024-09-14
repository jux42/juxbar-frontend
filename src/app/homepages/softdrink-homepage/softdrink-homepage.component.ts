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
  classes: string[] = [];
  index!: number;
  protected readonly environment = environment;

  constructor(private softDrinkService: SoftDrinkService, private router: Router) {
  }

  ngOnInit(): void {
    this.softDrinks$ = this.getRandomSoftDrinks();
    this.initializeClasses();
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
    const uniqueIds = new Set<number>();
    const maxId = 58;
    const numIdsNeeded = 58;

    while (uniqueIds.size < numIdsNeeded) {
      const randomId = Math.floor(Math.random() * maxId) + 1;
      uniqueIds.add(randomId);
    }

    const requests = Array.from(uniqueIds).map(id => this.softDrinkService.getOneSoftDrinkById(id));
    return forkJoin(requests);
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
