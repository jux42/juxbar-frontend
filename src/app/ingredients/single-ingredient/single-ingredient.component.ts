import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {Ingredient} from "../../core/models/ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../core/services/ingredientService";
import {BoldWordsPipe} from "../../core/services/bold-words.pipe";
import {environment} from "../../../environments/environment";
import {Location} from "@angular/common";
import {last} from "rxjs";

@Component({
  selector: 'app-single-ingredient',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    NgForOf,
    BoldWordsPipe
  ],
  templateUrl: './single-ingredient.component.html',
  styleUrl: './single-ingredient.component.css'
})
export class SingleIngredientComponent implements OnInit{
  @Input() ingredient!: Ingredient;

  constructor(private location: Location, private ingredientService: IngredientService, private route: ActivatedRoute  ) {

  }

  ngOnInit(): void {

    const strIngredient: string = this.route.snapshot.params['strIngredient'];
    this.ingredientService.getOneIngredientByName(strIngredient).subscribe(data=>{
      this.ingredient = data;
      console.log(data);},
    )

  }
goBack(){
    this.location.back();
  }

  protected readonly environment = environment;
}
