import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/page-not-found/not-found.component'
import { HttpClientModule } from '@angular/common/http';
// ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../store/effects/user.efffects';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AccountComponent,
    NotFoundComponent,
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
    EffectsModule.forRoot([
      UserEffects,
    ]),
    // StoreModule.forFeature('user', reducer),
    // EffectsModule.forFeature([UserEffects]),
    /*
     EffectsModule.forRoot([
      CustomerSupportEffects,
      SpinnerEffects,
      AlertEffects,
      RouteEffects,
      ModalEffects,
      AppEffects,
    ]),
    */ 
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
    AccountComponent,
  ],
})
export class AuthModule { }
