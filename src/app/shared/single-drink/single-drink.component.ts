import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-single-drink',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './single-drink.component.html',
  styleUrl: './single-drink.component.scss'
})
export class SingleDrinkComponent {
  @Input() drinkName: string = '';
  @Input() ingredients: string[] = [];
  @Input() instructions: string = '';
  @Input() imageUrl: string = '';
}
