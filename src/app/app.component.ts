import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./core/components/header/header.component";
import {slideInAnimation} from "./animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideInAnimation
  ],

})

export class AppComponent implements OnInit {
  title = 'juxBar';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit() {
  }
}
