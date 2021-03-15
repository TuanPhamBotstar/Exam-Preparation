import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

const testUrl = 'http://localhost:8082/api/admin/tests';
@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    public http: HttpClient,
  ) { }

  addNewTest(newTest: Test): Observable<{}> {
    return this.http.post(testUrl, newTest);
  }
  putQuestions(data: {}): Observable<{}> {
    return this.http.put(`${testUrl}`, data);
  }
  getDetaiTest(author: string,subject_id: string, test_id: string): Observable<any> {
    return this.http.get(`${testUrl}/detail/${author}/${subject_id}/${test_id}`);
  }
  getTestsByName(author: string,subject_id: string, testTitle: string): Observable<any> {
    return this.http.get(`${testUrl}/search/${author}/${subject_id}/${testTitle}`);
  }
  getTesting(test_id: string): Observable<any> {
    return this.http.get(`${testUrl}/testing/${test_id}`);
  }
  getTestsBySubject_id(author: string,subject_id: string): Observable<{}> {
    return this.http.get(`${testUrl}/subject/${author}/${subject_id}`);
  }
  delTest(id: string): Observable<{}> {
    return this.http.delete(`${testUrl}/${id}`);
  }
  putTypeCode(shareTest: {}): Observable<{}> {
    return this.http.put(`${testUrl}`, shareTest);
  }
}
