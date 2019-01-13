import {Component, OnInit} from '@angular/core';
import {Account} from './model/account';
import {AccountService} from './service/account.service';
import {IdentityManagerService} from '../user/login/service/identity-manager.service';
import {Money} from '../user/registration/model/money';

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

  async ngOnInit() {
    await this.accountService.details(this.identityService.user.accountId)
      .subscribe(accountDetails => this.account = accountDetails);
  }

  handlePaymentEvent(money: Money) {
    // TODO CurrencyConversion
    const newValue = new Money();
    newValue.currency = this.account.totalMoney.currency;
    newValue.amount = +this.account.totalMoney.amount + +money.amount;

    this.account.totalMoney = newValue;
  }
}
