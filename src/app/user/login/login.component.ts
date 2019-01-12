import {Component, OnInit} from '@angular/core';
import {LoginData} from './model/login-data';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;

  constructor(private loginService: LoginService) {
    this.loginData = new LoginData();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginData).subscribe(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  logout() {
    this.loginService.logout().subscribe(errorMessage => {
      if (errorMessage == null) {
      }
    });
  }
}
