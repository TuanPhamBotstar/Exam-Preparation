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
    public http:HttpClient,
  ) { }

  addNewTest(newTest:Test):Observable<{}>{
    return this.http.post(testUrl,newTest);
  }
  putQuestions(data:{}):Observable<{}>{
    return this.http.put(`${testUrl}`,data);
  }
  getTest(id:string):Observable<any>{
    return this.http.get(`${testUrl}/${id}`);
  }
}
