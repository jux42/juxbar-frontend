import { Injectable } from '@angular/core';
import {InputSecurityService} from "./input-security.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordCkeckerService {

  constructor(readonly inputSecurity : InputSecurityService) { }

  checkPasswordValidity(password: string, newPassword: string | null): boolean {

    if (password.length < 6 || password === '') {
      alert("password must be 6 characters at least")
      return false;
    }
    if (password !== newPassword) {
      alert("Passwords do not match!");
      return false;
    }
    if (!this.inputSecurity.validateInput(password)) {
      alert("Your passwords must contain only letters, digits and punctuation signs");
      return false;
    }
    return true;
  }

  checkPasswordCompliance(password: string) {

    if (password.length < 6 || password === '') {
      alert("password too short")
      return false;
    }
    if (!this.inputSecurity.validateInput(password)) {
      alert("Your password should contain only letters, digits and punctuation signs");
      return false;
    }
    return true;
  }

}
