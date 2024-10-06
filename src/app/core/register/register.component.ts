import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {ProfileService} from "../services/profile.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {PasswordCkeckerService} from "../components/security/password-ckecker.service";
import {InputSecurityService} from "../components/security/input-security.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  secretQuestion: string = '';
  secretAnswer: string = '';
  message: string = '';
  secretQuestions = [
    'Quel est le nom de votre premier animal de compagnie ?',
    'Quel est votre lieu de naissance ?',
    'Quelle est votre couleur préférée ?',
    'Quel est votre sport favori ?',
    'Quel est le prénom de votre meilleur ami d’enfance ?'
  ];

  constructor(private router: Router, private formBuilder: FormBuilder,
              private profileService: ProfileService,
              readonly  passwordChecker: PasswordCkeckerService,
              readonly inputSecurity : InputSecurityService,) {
  }


  // checkPasswords(group: FormGroup) {
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : {notSame: true};
  // }

  async onCreateAccount(form: any) {
    const {username, secretQuestion, secretAnswer, password, confirmPassword} = form.value;
    if(!this.passwordChecker.checkPasswordValidity(password, confirmPassword )) {
      return;
    }
    if(!this.inputSecurity.validateInput(username) || !this.inputSecurity.validateInput(secretAnswer)) {
      alert("username and secret answer can only contain letters and digits");
      return;
    }

    try {
      const response = await firstValueFrom(this.profileService.createAccount(username, secretQuestion, secretAnswer, password));
      if (password.length < 6) {
        alert("password must be 6 caracters at least")
        return;
      }
      console.log(response);
      alert(`${response}`);
      form.reset();
    } catch (error) {
      console.error('An error occurred while creating user:', error);
      alert(`An error occurred: ${error}`);
    }
  }
}
