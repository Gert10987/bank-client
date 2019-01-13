import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../model/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input()
  payments: Array<Payment>;

  constructor() {
  }

  ngOnInit() {
  }
}
