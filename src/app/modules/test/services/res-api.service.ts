import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const checkUrl = 'http://localhost:8082/api/admin/tests/check';
const resUrl = 'http://localhost:8082/api/admin/results';
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
  saveTested(result: any): Observable<{}>{
    return this.http.post(`${resUrl}`, result);
  }
  getResults(user_id: string, time: string):Observable<any>{
    return this.http.get(`${resUrl}/${user_id}/${time}`);
  }
  getResultByAuthor(author: string, time: string):Observable<any>{
    return this.http.get(`${resUrl}/admin/${author}/${time}`);
  }
  getResultBySubject(author: string, subject_id: string):Observable<any>{
    return this.http.get(`${resUrl}/dashboard/${author}/${subject_id}`);
  }
  getResultByTest(author: string, test_id: string, time: string):Observable<any>{
    return this.http.get(`${resUrl}/test/${author}/${test_id}/${time}`);
  }
}
