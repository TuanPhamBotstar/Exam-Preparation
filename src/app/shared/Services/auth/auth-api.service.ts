import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const userUrl = 'http://localhost:8082/api/users';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    public http: HttpClient,
  ) { }

  getUsers(): Observable<{}> {
    return this.http.get(userUrl);
  }

  addUser(user: User): Observable<{}> {
    return this.http.post(`${userUrl}/signup`, user);
  }

  login(user: {}): Observable<{}> {
    return this.http.post(`${userUrl}`, user);
  }
}
