import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Payment} from '../model/payment';
import {AccountService} from '../service/account.service';
import {IdentityManagerService} from '../../user/login/service/identity-manager.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Money} from '../../user/registration/model/money';
import {FormControl, Validators} from '@angular/forms';

export class TransferDialogData {
  amount: number;
  currency: string;
  otherAccountNumber: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  chargeMoney: Money;
  transferData: TransferDialogData;

  @Input()
  payments: Array<Payment>;

  @Output()
  paymentsEvent: EventEmitter<Money> = new EventEmitter();

  constructor(private accountService: AccountService,
              private identityService: IdentityManagerService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openChargeAccountDialog() {
    const dialogRef = this.dialog.open(ChargeDialog, {
      data: {money: this.chargeMoney}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.accountService.charge(this.identityService.user.accountId, result).subscribe(errorMessage => {
          if (errorMessage == null) {
            this.paymentsEvent.emit(result);

            // TODO Add response from server
            const payment = new Payment();
            payment.money = result;

            this.payments.push(payment);
          } else {
            this.openSnackBar(errorMessage);
          }
        });
      }
    });
  }

  openTransferMoneyDialog() {
    const dialogRef = this.dialog.open(TransferDialog, {
      data: {transfer: this.transferData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result);
        const money = new Money();
        money.amount = result.amount;
        money.currency = result.currency;

        this.accountService.transfer(this.identityService.user.accountId, result.otherAccountNumber, money).subscribe(errorMessage => {
          if (errorMessage == null) {

            money.amount = money.amount - (money.amount * 2);
            this.paymentsEvent.emit(money);

            // TODO Add response from server
            const payment = new Payment();
            payment.money = money;

            this.payments.push(payment);
          } else {
            this.openSnackBar(errorMessage);
          }
        });
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'app-charge-dialog',
  templateUrl: './dialog/charge-dialog.html',
})
export class ChargeDialog {
  constructor(
    public dialogRef: MatDialogRef<ChargeDialog>,
    @Inject(MAT_DIALOG_DATA) public money: Money) {
  }

  amountOfMoneyControl = new FormControl('', [
    Validators.pattern('[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?(\\.[0-9][0-9]?)?')
  ]);
}

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './dialog/transfer-dialog.html',
})
export class TransferDialog {
  constructor(
    public dialogRef: MatDialogRef<TransferDialog>,
    @Inject(MAT_DIALOG_DATA) public transfer: TransferDialogData) {
  }

  amountOfMoneyControl = new FormControl('', [
    Validators.pattern('[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?(\\.[0-9][0-9]?)?')
  ]);
}
