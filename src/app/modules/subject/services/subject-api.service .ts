import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Subject } from '../models/subject.model';

const subjectUrl = 'http://localhost:8082/api/admin/subjects';
const questionUrl = 'http://localhost:8082/api/admin/questions';
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
  getSubjects(user_id:string):Observable<{}>{
    return this.http.get(`${subjectUrl}/author/${user_id}`);
  }
  getSubjectName(subject_id:string):Observable<any>{
    return this.http.get(`${subjectUrl}/${subject_id}`);
  }
  delSubject(id:string):Observable<{}>{
    console.log(id)
    return this.http.delete(`${subjectUrl}/delete/${id}`);
  }
  // question handle
  addQuestion(question: Question):Observable<{}>{
    return this.http.post(`${questionUrl}`,question);
  }
  getQuestions(subject_id:string):Observable<{}>{
    return this.http.get(`${questionUrl}/${subject_id}`);
  }
  delQuestion(id:string):Observable<{}>{
    return this.http.delete(`${questionUrl}/${id}`);
  }
  putQuestionsForTest(test:{}):Observable<{}>{
    console.log(test)
    return this.http.post(`${questionUrl}/test`, test);
  }
  // test handle

}
