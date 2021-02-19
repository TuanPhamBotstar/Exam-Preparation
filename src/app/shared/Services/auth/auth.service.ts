import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/store/state/user.state';
import * as Actions from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private store: Store<Appstate>,
  ) { }

  getUser() {
    return this.store.select('user');
  }

  addUser(user: User) {
    this.store.dispatch(new Actions.AddUser(user));
  }

  login(user:User) {
    return this.store.dispatch(new Actions.Login(user));
  }
  
}
