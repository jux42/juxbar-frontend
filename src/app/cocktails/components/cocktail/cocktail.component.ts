import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {HttpClient} from "@angular/common/http";
import {CocktailService} from "../../../core/services/cocktailService";
import {map, Observable, tap} from "rxjs";
import {AsyncPipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.css'
})
export class CocktailComponent implements OnInit{

  @Input()   cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!:number;
  constructor(private cocktailService: CocktailService, private router: Router) {
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
  goToCocktail(){
    this.router.navigateByUrl(`juxbar/onecocktail/${this.cocktail.id}`)
  }
}
