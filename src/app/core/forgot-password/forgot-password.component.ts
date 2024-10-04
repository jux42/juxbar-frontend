import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {PasswordRecoveryService} from "../services/password-recovery.service";
import {firstValueFrom} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private passwordRecoveryService: PasswordRecoveryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  async onRecover(form: any) {
    const {username, secretQuestion, secretAnswer, password, confirmPassword} = form.value;
    if (password.length < 6 || password === '') {
      alert("password must be 6 characters at least")
      return;
    }
    if (password != confirmPassword ) {
      alert("passwords do not match")
      return;
    }
    try {
      const response = await firstValueFrom(this.passwordRecoveryService.recoverPassword(username, secretQuestion, secretAnswer, password));

      console.log(response);
      alert(`${response}`);
      form.reset();
    } catch (error) {
      console.error('An error occurred while creating user:', error);
      alert(`An error occurred: ${error}`);
    }
  }
}
