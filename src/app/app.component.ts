import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./core/components/header/header.component";
import {FadeInOutAnimation} from "./animations";
import {SideBarComponent} from "./core/components/side-bar/side-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    FadeInOutAnimation
  ],

})

export class AppComponent implements OnInit {
  title = 'juxBar';
  showNavBar = true;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

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
