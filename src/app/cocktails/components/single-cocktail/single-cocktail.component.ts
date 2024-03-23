import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {HttpClient} from "@angular/common/http";
import {CocktailService} from "../../../core/services/cocktailService";
import {map, Observable, tap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-single-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf
  ],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.css'
})
export class SingleCocktailComponent implements OnInit{

  @Input()   cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!:number;
constructor(private cocktailService: CocktailService, private route: ActivatedRoute, private router: Router) {
}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.cocktailService.getOneCocktailById(id).subscribe(data => {
      this.cocktail = data;

    });

  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  goBack(){
  this.router.navigateByUrl('juxbar');
  }
  getIngredients(cocktail: any): string[] {
    let ingredients: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  protected readonly RouterLink = RouterLink;
}
