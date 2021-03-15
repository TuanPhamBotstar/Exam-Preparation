import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
// import { AuthService } from '../../shared/Services/auth/auth.service';
import * as UserActions from '../actions/user.actions';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';

@Injectable({
    providedIn: 'root'
})

export class UserEffects {

    @Effect() loadUsers$ = this.actions$.pipe(
        ofType(UserActions.LOAD_USERS),
        mergeMap((action:UserActions.LoadUsers) => this.authApi.getUsers()
          .pipe(
            map((data) =>  new UserActions.LoadUsersSuccess(data)),
            catchError(error => of(new UserActions.LoadUsersFailure(error)))
          ))
      );

      @Effect() addUser$ = this.actions$.pipe(
        ofType(UserActions.ADD_USER),
        mergeMap((action:UserActions.AddUser) => this.authApi.addUser(action.payload)
          .pipe(
            map((data) => new UserActions.AddUserSuccess(action.payload, data)),
            catchError(error => of(new UserActions.AddUserFailure(error)))
          ))
      );

      @Effect() login$ = this.actions$.pipe(
        ofType(UserActions.LOGIN),
        mergeMap((action:UserActions.Login) => this.authApi.login(action.payload)
          .pipe(
            map((data) => new UserActions.LoginSuccess(data)),
            catchError(error => of(new UserActions.LoginFailure(error)))
          ))
      );
    constructor(
        private actions$: Actions,
        private authApi: AuthApiService,
    ) { }
}

