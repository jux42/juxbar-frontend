import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {ProfileService} from "../services/profile.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

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
export class RegisterComponent implements OnInit {
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

  constructor(private router: Router, private formBuilder: FormBuilder, private profileService: ProfileService ) {}

  ngOnInit(): void {
    // this.registerForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required],
    //   secretQuestion: ['', Validators.required],
    //   secretAnswer: ['', Validators.required]
    // }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  async onCreateAccount(form: any) {
    const {username, secretQuestion, secretAnswer, password} = form.value;
    try {
      const response = await firstValueFrom(this.profileService.createAccount(username, secretQuestion, secretAnswer, password));
      if (password.length <6) {
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
