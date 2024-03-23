import {Component, Input} from '@angular/core';
import {NgIf, TitleCasePipe} from "@angular/common";
import {Ingredient} from "../../core/models/ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../core/services/ingredientService";

@Component({
  selector: 'app-single-ingredient',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './single-ingredient.component.html',
  styleUrl: './single-ingredient.component.css'
})
export class SingleIngredientComponent {
  @Input() ingredient!: Ingredient;

  constructor(private router: Router, private ingredientService: IngredientService, private route: ActivatedRoute  ) {

  }

  ngOnInit(): void {

    const strIngredient: string = this.route.snapshot.params['strIngredient'];
    this.ingredientService.getOneIngredientByName(strIngredient).subscribe(data=>{
      this.ingredient = data;
      console.log(data);},
    )

  }


}
