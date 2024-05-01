import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../login/auth-service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PersonalCocktailComponent} from "../../personal-cocktail/personal-cocktail.component";
import {CocktailComponent} from "../../cocktails/components/cocktail/cocktail.component";
import {PersonalCocktailService} from "../services/cocktailService";
import {PersonalCocktail} from "../models/personal-cocktail";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    PersonalCocktailComponent,
    CocktailComponent,
    NgForOf,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userName!: string | undefined;
  loggedIn: boolean = false;
  invite!: string;

  isLoading: boolean = true;

  @Input() personalCocktail!: PersonalCocktail;

  personalCocktails!: PersonalCocktail[];


  constructor(private authService: AuthService, private router: Router, private personalCocktailService : PersonalCocktailService) {
  }

  ngOnInit() {

    this.checkLoggedIn();
    console.log(this.loggedIn)
    this.loadPersonalCocktails();
    // this.personalCocktails$ = this.personalCocktailsSubject.asObservable();
    // this.personalCocktailService.getAllPersonalCocktails().subscribe(data => {
    //   this.personalCocktailsSubject.next(data);
    //   this.isLoading = false;
    //   console.log(data)

    // });
  }

  loadPersonalCocktails() {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.personalCocktailService.getAllPersonalCocktails(username).subscribe({
          next: (cocktails) => {
            this.personalCocktails = cocktails;
            this.isLoading = false;  // Assurez-vous de mettre à jour le statut de chargement
          },
          error: (error) => {
            console.error('Error loading personal cocktails', error);
            this.isLoading = false;  // Mettre à jour même en cas d'erreur
          }
        });
      } else {
        console.error('Username is null');
        this.isLoading = false;
      }
    });
  }

  checkLoggedIn(): boolean{

    this.authService.isLoggedIn().pipe(
      tap(next => {
        this.userName=this.authService.username.getValue()?.toString();
        this.loggedIn = true;
      })

    ).subscribe();
    return this.loggedIn;

  }



}
