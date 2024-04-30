import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../login/auth-service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn = this.authService.isLoggedIn();
  username = this.authService.getUsername();
  protected readonly RouterLink = RouterLink;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      console.log('Is logged in:', loggedIn);
    });
    this.authService.getUsername().subscribe(username => {
      console.log('Current username:', username);
    });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigateByUrl("/")
  }

  goLogin() {
    this.router.navigateByUrl("/login")
  }
  goLogout() {
    this.authService.logout();
  }

}
