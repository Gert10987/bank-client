import {Component, OnInit} from '@angular/core';
import {Account} from './model/account';
import {AccountService} from './service/account.service';
import {IdentityManagerService} from '../user/login/service/identity-manager.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account;

  constructor(private accountService: AccountService, private identityService: IdentityManagerService) {
    this.account = new Account();
  }

  ngOnInit() {
    this.accountService.details(this.identityService.user.accountId)
      .subscribe(accountDetails => this.account = accountDetails);
  }
}
