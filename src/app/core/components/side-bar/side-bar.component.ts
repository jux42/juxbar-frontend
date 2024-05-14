import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {CocktailService} from "../../services/cocktailService";
import {CocktailComponent} from "../../../drinks/cocktails/components/cocktail/cocktail.component";
import {Cocktail} from "../../models/cocktail";
import {AsyncPipe, NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CocktailComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [
    trigger('fadeInSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class SideBarComponent implements OnInit{

  cocktailOfTheDayId!: number;

  cocktail!: Cocktail;
  constructor(private router: Router, private cocktailService: CocktailService) {
  }

  ngOnInit() {

    this.cocktailOfTheDayId = this.cocktailService.getCocktailOfTheDayId(569);
    console.log(this.cocktailOfTheDayId)
    this.cocktailService.getOneCocktailById(this.cocktailOfTheDayId).subscribe(
      data => this.cocktail = data
    );
  }



  onGoToRandomCocktail() {
    let randomCocktailId = Math.floor(Math.random() * 570);
    console.log(randomCocktailId);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`juxbar/onecocktail/${randomCocktailId}`]);
    });
  }

  onGoToCocktailOfTheDay(id:number){

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`juxbar/onecocktail/${id}`]);
    });
  }

  protected readonly environment = environment;
}


