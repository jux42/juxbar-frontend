import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  protected readonly RouterLink = RouterLink;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigateByUrl("/")
  }

}
