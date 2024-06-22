import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {CocktailService} from "../../../../core/services/cocktailService";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BoldWordsPipe} from "../../../../core/services/bold-words.pipe";
import {environment} from "../../../../../environments/environment";
import {CapitalizeFirstPipe} from "../../../../capitalize-first.pipe";

@Component({
  selector: 'app-single-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    BoldWordsPipe
  ],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.scss'
})
export class SingleCocktailComponent implements OnInit {

  @Input() cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!: number;
  imageLoaded: { [key: string]: boolean } = {};
  protected readonly RouterLink = RouterLink;
  protected readonly environment = environment;

  constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private router: Router, private capitalizeFirst: CapitalizeFirstPipe) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.cocktailService.getOneCocktailById(id).subscribe(data => {
      this.cocktail = data;

    });

  }

  goBack() {
    this.router.navigateByUrl('juxbar/listall');
  }

  getIngredients(cocktail: any): string[] {
    let ingredients: string[] = [];

    if (!cocktail) {
      return ingredients;
    }

    for (let i = 1; i <= 6; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  formatIngredientURL(ingredient: string): string {
    let formattedIngredient:string = this.capitalizeFirst.transform(ingredient)
    return `/juxbar/detailledingredient/${formattedIngredient}`;
  }
}
