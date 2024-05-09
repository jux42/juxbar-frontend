import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../../core/models/cocktail";
import {CocktailService} from "../../../../core/services/cocktailService";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BoldWordsPipe} from "../../../../core/services/bold-words.pipe";
import {environment} from "../../../../../environments/environment";

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
  protected readonly RouterLink = RouterLink;
  protected readonly environment = environment;
  imageLoaded: {[key: string]: boolean} = {};


  constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private router: Router) {
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
}
