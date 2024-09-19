import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FadeInOutAnimation} from "../animations";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";


@Component({
  animations: [FadeInOutAnimation],
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  appName!: string;

  constructor(private router: Router, private http: HttpClient) {
  }


  ngOnInit() {
    this.http.get(`http://${environment.apiUrl}/appname`, {responseType: 'text'}).subscribe(data => {
      this.appName = data;
    });

  }

  onGoToCocktails() {
    this.router.navigateByUrl('juxbar/cocktailhome');
  }

  onGoToSoftDrinks() {
    this.router.navigateByUrl('juxbar/softdrinkhome');
  }
}
