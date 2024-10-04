import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputSecurityService {

  constructor() { }

  sanitizeInput(input: string): string {
    const taglessString = input.replace(/<\/?[^>]+(>|$)/g, "");

    return taglessString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  validateInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s.,!?-]+$/;
    return regex.test(input);
  }
}
