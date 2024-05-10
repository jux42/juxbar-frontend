import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./core/components/header/header.component";
import {slideInAnimation} from "./animations";
import {NavBarComponent} from "./core/components/nav-bar/nav-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideInAnimation
  ],

})

export class AppComponent implements OnInit {
  title = 'juxBar';
  showNavBar = true;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Suppose que la route de la landing page est '/'
        this.showNavBar = event.url !== '/';
      }
    });
  }



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit() {
  }
}
