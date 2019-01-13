import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {IdentityManagerService} from '../user/login/service/identity-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.identityService.isLogged;
  }

  constructor(private router: Router, private identityService: IdentityManagerService) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        if (!this.isLoggedIn && event.url.includes('account')) {
          this.router.navigate(['login']);
        }
      }
    });
  }

  ngOnInit() {
  }
}
