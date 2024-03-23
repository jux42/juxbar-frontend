import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../core/models/cocktail";
import {Observable} from "rxjs";
import {CocktailService} from "../../../core/services/cocktailService";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {SingleCocktailComponent} from "../single-cocktail/single-cocktail.component";
import {CocktailComponent} from "../cocktail/cocktail.component";

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [
    NgForOf,
    CocktailComponent
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit{
  @Input()   cocktail !: Cocktail;
  cocktails$!: Observable<Cocktail[]>;
  cocktails!: Cocktail[];
  imageData!: Response;
  id!:number;
  constructor(private cocktailService: CocktailService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cocktailService.getAllCocktails().subscribe(data=>
    this.cocktails = [...data]
    )
  }

}
