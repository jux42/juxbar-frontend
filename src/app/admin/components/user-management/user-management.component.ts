import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminService} from "../../../core/services/admin.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map} from "rxjs/operators";
import {firstValueFrom, Observable, tap} from "rxjs";
import {JuxbarUser} from "../../../core/models/juxbar-user";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  juxbarUsers: JuxbarUser[] = [];
  usernames: string[] = [];
  selectedUsername!: string;
  detailedUser!: JuxbarUser;
  active!: boolean;
  showOptions: boolean = false;
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.loadUsers();


  }
  async onCreateUser(form: any) {
    const {username, password} = form.value;
    try {
      const response = await firstValueFrom(this.adminService.createUser(username, password));
      console.log(response);
      alert(`${response}`);
      form.reset();
    } catch (error) {
      console.error('An error occurred while creating user:', error);
      alert(`An error occurred: ${error}`);
    }
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

  onUserDetails() {
    const user = this.juxbarUsers.find(u => u.username === this.selectedUsername);
    if (user) {
      this.detailedUser = user;
      this.showOptions = true;
      this.cdr.detectChanges();
    }
  }

  async onChangePassword(pwdForm: NgForm) {
    const newPassword = pwdForm.value.newPassword;
    const newPasswordBis = pwdForm.value.newPasswordBis;

    if (newPassword !== newPasswordBis) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await firstValueFrom(this.adminService.changePassword(this.detailedUser.username, newPassword));
      console.log(response);
      alert(`${response}`);
      pwdForm.reset();
    } catch (error) {
      console.error('An error occurred while changing password:', error);
      alert(`An error occurred: ${error}`);
    }
  }

  async onReactivate(){
    try{
      const response = await firstValueFrom(this.adminService.reactivateUser(this.detailedUser.username));
      console.log(response);
      alert(`${response}`);
      this.detailedUser.active = true;
      this.cdr.detectChanges();

    }catch (error){
      console.error('An error occurred while restoring user:', error);
      alert(`An error occurred: ${error}`);
    }

  }

  async onDeactivate(){
    try{
      const response = await firstValueFrom(this.adminService.deactivate(this.detailedUser.username));
      console.log(response);
      alert(`${response}`);
      this.detailedUser.active = false;
      this.cdr.detectChanges();

    }catch (error){
      console.error('An error occurred while disabling user:', error);
      alert(`An error occurred: ${error}`);
    }

  }



  protected readonly HTMLSelectElement = HTMLSelectElement;
}
