import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component'
import { HttpClientModule } from '@angular/common/http';
// ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/effects/user.efffects';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AccountComponent,
    LoggedInComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,  
    HttpClientModule,
    StoreModule.forRoot({
      user: reducer,
    },{
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
    AccountComponent,
  ],
})
export class AuthModule { }
