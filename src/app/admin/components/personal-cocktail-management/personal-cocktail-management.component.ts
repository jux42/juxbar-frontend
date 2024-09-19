import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {map} from "rxjs/operators";
import {AdminService} from "../../../core/services/admin.service";
import {JuxbarUser} from "../../../core/models/juxbar-user";
import {PersonalCocktail} from "../../../core/models/personal-cocktail";
import {PersonalCocktailService} from "../../../core/services/cocktailService";
import {State} from "../../../core/models/state";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-personal-cocktail-management',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './personal-cocktail-management.component.html',
  styleUrl: './personal-cocktail-management.component.scss'
})
export class PersonalCocktailManagementComponent implements OnInit {

  juxbarUsers: JuxbarUser[] = [];
  usernames: string[] = [];
  selectedUsername!: string;
  detailedUser!: JuxbarUser;
  personalCocktails: PersonalCocktail[]= [];
  isLoading: boolean = true;


  constructor(private adminService: AdminService,
              private cdr: ChangeDetectorRef,
              private personalCocktailService: PersonalCocktailService ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.listUsers().pipe(
      map((users) => {
        users.forEach((user) => {
          if (user.username == 'superadmin' || user.username == 'admin') {
            console.log(user.username + ' skipped');
          }else {
            console.log(user.username, user.active);
            this.juxbarUsers.push(user);
            this.usernames.push(user.username);

          }
        })
      })
    ).subscribe();

  }

  loadPersonalCocktails(username: string) {
    this.isLoading = true;
    this.personalCocktailService.getPersonalCocktailsOfUser(username).subscribe({
      next: (cocktails) => {
        this.personalCocktails = cocktails;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading personal cocktails:', error);
        this.isLoading = false;
      }
    });
  }

  onUserDetails() {
    const user = this.juxbarUsers.find(u => u.username === this.selectedUsername);
    if (user) {
      this.detailedUser = user;
      this.loadPersonalCocktails(user.username);
      this.cdr.detectChanges();

    }
  }

  async onRestorePersonalCocktail(id: number){
    try {
      const response = await firstValueFrom(this.adminService.restorePersonalCocktail(this.selectedUsername, id));
      alert(`${response}`);
      this.personalCocktails.forEach(c=>{
        if (c.id == id){
          c.state = State.SHOWED;
        }
      })
      this.cdr.detectChanges()
    }catch (error){
      console.error('An error occurred while restoring cocktail:', error);
      alert(`An error occurred: ${error}`);
    }

  }


  async onTrashPersonalCocktail(id: number){
    try {
      const response = await firstValueFrom(this.adminService.trashPersonalCocktail(this.selectedUsername, id));
      alert(`${response}`);
      this.personalCocktails.forEach(c=>{
        if (c.id == id){
          c.state = State.TRASHED;
        }
      })
      this.cdr.detectChanges()
    }catch (error){
      console.error('An error occurred while restoring cocktail:', error);
      alert(`An error occurred: ${error}`);
    }

  }


  protected readonly State = State;
  protected readonly environment = environment;
}



