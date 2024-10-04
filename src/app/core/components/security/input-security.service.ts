import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputSecurityService {

  constructor() {
  }

  validateInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s.,!?-]+$/;
    return regex.test(input);
  }
}
