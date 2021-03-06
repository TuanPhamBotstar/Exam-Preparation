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
    // console.log(subject)
    return this.http.post(subjectUrl, subject);
  }
  getSubjects(user_id:string, page: number):Observable<{}>{
    return this.http.get(`${subjectUrl}/author/${user_id}/${page}`);
  }
  getSubjectsByName(author: string, subjectname: string):Observable<any>{
    return this.http.get(`${subjectUrl}/${author}/${subjectname}`);
  }
  getSubjectName(subject_id:string):Observable<any>{
    return this.http.get(`${subjectUrl}/${subject_id}`);
  }
  editSubjectName(subject_id: string, newSubjectName: {}):Observable<any>{
    return this.http.put(`${subjectUrl}/${subject_id}`,newSubjectName);
  }
  removeSubject(id:string):Observable<{}>{
    return this.http.delete(`${subjectUrl}/delete/${id}`);
  }
  // question handle
  addQuestion(question: Question):Observable<{}>{
    return this.http.post(`${questionUrl}`,question);
  }
  editQuestion(qs_id: string, question: Question):Observable<{}>{
    return this.http.put(`${questionUrl}/${qs_id}`,question);
  }
  getQuestions(author: string, subject_id:string, page: number):Observable<{}>{
    return this.http.get(`${questionUrl}/bySubject/${author}/${subject_id}/${page}`);
  }
  delQuestion(id:string):Observable<{}>{
    return this.http.delete(`${questionUrl}/${id}`);
  }
  putQuestionsForTest(test:{}):Observable<{}>{
    console.log(test)
    return this.http.post(`${questionUrl}/test`, test);
  }
  getQuestion(question_id: string):Observable<any>{
    return this.http.get(`${questionUrl}/edit/${question_id}`);
  }
  // test handle
  getQtyQs(subject_id):Observable<any>{
    return this.http.get(`${questionUrl}/${subject_id}`);
  }

}
