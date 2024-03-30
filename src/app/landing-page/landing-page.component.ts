import {Component} from '@angular/core';
import {Router} from "@angular/router";

interface OnInit {
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {
  }

  onGotToCocktails() {
    this.router.navigateByUrl('juxbar/listall');
  }
  onGoToSoftDrinks() {
    this.router.navigateByUrl('juxbar/listallsofts');
  }
}
