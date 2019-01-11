import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        if (!event.url.includes('login')) {
          this.router.navigate(['login']);
        }
      }
    });
  }

  ngOnInit() {
  }
}
