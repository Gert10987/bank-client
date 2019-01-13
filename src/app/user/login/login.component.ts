import {Component, OnInit} from '@angular/core';
import {LoginData} from './model/login-data';
import {LoginService} from './service/login.service';
import {IdentityManagerService} from './service/identity-manager.service';
import {Router} from '@angular/router';
import {User} from './model/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;

  constructor(private loginService: LoginService, private identityService: IdentityManagerService,
              private router: Router, private snackBar: MatSnackBar) {
    this.loginData = new LoginData();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginData).subscribe(user => {
        if (user != null) {
          this.identityService.isLogged = true;
          this.identityService.user = user as User;
          this.identityService.jwtToken = user.token;
          this.router.navigate(['account']);
        }
      },
      error => {
        this.openSnackBar(error['error']);
      }
    );
  }

  logout(tokenId: string) {
    this.loginService.logout(tokenId).subscribe(errorMessage => {
      if (errorMessage == null) {
        this.identityService.isLogged = false;
        this.identityService.user = null;
        this.router.navigate(['login']);
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
