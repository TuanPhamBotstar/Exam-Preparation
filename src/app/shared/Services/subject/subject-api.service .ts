import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject.model';

const subjectUrl = 'http://localhost:8082/api/subjects';
@Injectable({
  providedIn: 'root'
})
export class SubjectApiService {

  constructor(
    private http: HttpClient,
  ) { }
  addSubject(subject: Subject): Observable<{}> {
    console.log(subject)
    return this.http.post(subjectUrl, subject);
  }
  getSubject():Observable<{}>{
    return this.http.get(subjectUrl);
  }
}
