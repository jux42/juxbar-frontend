import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {slideInAnimation} from "../animations";

interface OnInit {
}

@Component({
  animations: [slideInAnimation],
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {
  }

  onGoToCocktails() {
    this.router.navigateByUrl('juxbar/listall');
  }

  onGoToSoftDrinks() {
    this.router.navigateByUrl('juxbar/listallsofts');
  }
}
