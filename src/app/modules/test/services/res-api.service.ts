import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const checkUrl = 'http://localhost:8082/api/admin/tests/check';

@Injectable({
  providedIn: 'root'
})

export class ResApiService {

  constructor(
    private http: HttpClient,
  ) { }
  checkAnswers(check):Observable<{}>{
    return this.http.post(`${checkUrl}`, check)
  }
}
