import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShellComponent} from './shell/shell.component';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {RegistrationComponent} from './user/registration/registration.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AccountComponent} from './account/account.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {IdentityManagerService} from './user/login/service/identity-manager.service';

import {MatGridListModule} from '@angular/material/grid-list';
import {ChargeDialog, PaymentsComponent, TransferDialog} from './account/payments/payments.component';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {MatIconModule} from '@angular/material/icon';

import {MatDialogModule} from '@angular/material/dialog';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'account', component: AccountComponent},
];

@NgModule({
  declarations: [
    ShellComponent,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    PaymentsComponent,
    ChargeDialog,
    TransferDialog
  ],
  entryComponents: [
    ChargeDialog,
    TransferDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [IdentityManagerService],
  bootstrap: [ShellComponent]
})
export class AppModule {
}
