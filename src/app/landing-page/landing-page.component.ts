import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {slideInAnimation} from "../animations";



@Component({
  animations: [slideInAnimation],
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {
  }
ngOnInit() {
}

  onGoToCocktails() {
    this.router.navigateByUrl('juxbar/listall');
  }

  onGoToSoftDrinks() {
    this.router.navigateByUrl('juxbar/listallsofts');
  }
}
