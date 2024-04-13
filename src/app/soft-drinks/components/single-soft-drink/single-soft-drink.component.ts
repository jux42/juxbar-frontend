import {Component, Input, OnInit} from '@angular/core';
import {SoftDrink} from "../../../core/models/softDrink";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SoftDrinkService} from "../../../core/services/softDrinkService";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-single-soft-drink',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './single-soft-drink.component.html',
  styleUrl: './single-soft-drink.component.scss'
})
export class SingleSoftDrinkComponent implements OnInit {

  @Input() softDrink!: SoftDrink;

  id!: number;
  protected readonly environment = environment;

  constructor(private router: Router, private route: ActivatedRoute, private softDrinkService: SoftDrinkService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    this.softDrinkService.getOneSoftDrinkById(this.id).subscribe(
      data => this.softDrink = data
    )
  }

  truncateText(text: string, maxLength: number) {

    return (text.length > maxLength) ? text.substring(0, maxLength) + "..."
      : text;
  }

  getIngredients(softDrink: any): string[] {
    let ingredients: string[] = [];
    for (let i = 1; i <= 7; i++) {

      const ingredient = softDrink[`strIngredient${i}`];
      if (ingredient) ingredients.push(ingredient);
    }

    return ingredients;
  }

  goBack() {
    this.router.navigateByUrl("/juxbar/listallsofts");
  }
}

