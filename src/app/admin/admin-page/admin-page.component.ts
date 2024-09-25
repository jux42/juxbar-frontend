import {Component} from '@angular/core';
import {UserManagementComponent} from "../components/user-management/user-management.component";
import {
  PersonalCocktailManagementComponent
} from "../components/personal-cocktail-management/personal-cocktail-management.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    UserManagementComponent,
    PersonalCocktailManagementComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

}
