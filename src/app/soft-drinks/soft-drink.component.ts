import {Component, Input, OnInit} from '@angular/core';
import {SoftDrink} from "../core/models/softDrink";
import {Observable} from "rxjs";
import {SoftDrinkService} from "../core/services/softDrinkService";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-soft-drink',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './soft-drink.component.html',
  styleUrl: './soft-drink.component.css'
})


  export class SoftDrinkComponent implements OnInit{

  @Input()   softDrink !: SoftDrink;
  softDrink$!: Observable<SoftDrink>;
  imageData!: Response;
  id!:number;
  constructor(private softDrinkService: SoftDrinkService, private router: Router) {
  }

  ngOnInit() {


  }


  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
  goToSoftDrink(){
    this.router.navigateByUrl(`juxbar/onesoftDrink/${this.softDrink.id}`)
  }
  getIngredients(softDrink: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = softDrink[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  protected readonly SoftDrink = SoftDrink;
  protected readonly environment = environment;
}
