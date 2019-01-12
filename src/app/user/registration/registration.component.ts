import {Component, OnInit} from '@angular/core';
import {RegistrationData} from './model/registration-data';
import {RegistrationService} from './service/registration.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerData: RegistrationData;

  constructor(private registrationService: RegistrationService, private snackBar: MatSnackBar, private router: Router ) {
    this.registerData = new RegistrationData();
  }

  ngOnInit() {
  }

  register() {
    this.registrationService.register(this.registerData).subscribe(errorMessage => {
      if (errorMessage == null) {
        this.router.navigate(['login']);
        this.openSnackBar('The account will be active within 30 minutes');
      } else {
        this.openSnackBar(errorMessage);
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
