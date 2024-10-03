import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../login/auth-service";
import {user} from "@angular/fire/auth";
import {CustomModalComponent} from "../../components/custom-modal/custom-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-manager',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CustomModalComponent
  ],
  templateUrl: './account-manager.component.html',
  styleUrl: './account-manager.component.scss'
})
export class AccountManagerComponent implements OnInit {

  active!: boolean;
  showOptions: boolean = false;

  deleteAccountWarning: string = "Are you sure you want to delete your account?\nAll you personal data, favourites, and custom cocktails will be erased from our database"
  title: string = 'Confirm Action';
  message: string = 'Are you sure you want to proceed?';
  showDeleteModal: boolean = false;


  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private route: Router,) {
  }

  ngOnInit(): void {

  }



  async onChangePassword(pwdForm: NgForm) {
    const newPassword = pwdForm.value.newPassword;
    const newPasswordBis = pwdForm.value.newPasswordBis;
    const username = sessionStorage.getItem("username");

    if (newPassword !== newPasswordBis) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await firstValueFrom(this.profileService.changePassword(username, newPassword));
      console.log(response);
      alert(`${response}`);
      pwdForm.reset();
    } catch (error) {
      console.error('An error occurred while changing password:', error);
      alert(`An error occurred: ${error}`);
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  handleConfirmation(result: boolean) {
    this.showDeleteModal = false;
    if (result) {
      this.deleteConfirmed().then(r =>
        this.route.navigate(['login'])
      );
    } else {
      return;
    }
  }

  async deleteConfirmed() {
    const username = sessionStorage.getItem("username");
    if (username) {
      try {
        const response = await firstValueFrom(this.profileService.deleteAccount(username));
        alert(`${response}`);
        this.authService.logout();
        this.cdr.detectChanges();
      } catch (error) {
        console.error('An error occurred while deleting user:', error);
        alert(`An error occurred: ${error}`);
      }
    }
  }


  protected readonly sessionStorage = sessionStorage;
  protected readonly user = user;
}
