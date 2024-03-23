import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {HttpClient} from "@angular/common/http";
import {CocktailService} from "../../../core/services/cocktailService";
import {map, Observable, tap} from "rxjs";
import {AsyncPipe, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-cocktail',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.css'
})
export class SingleCocktailComponent implements OnInit{

  @Input()   cocktail !: Cocktail;
  cocktail$!: Observable<Cocktail>;
  imageData!: Response;
  id!:number;
constructor(private cocktailService: CocktailService, private route: ActivatedRoute) {
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
}
