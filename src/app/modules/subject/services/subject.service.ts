import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/states/subject.state';
import * as SubjectActions from '../store/actions/subject.action';
import * as QuestionActions from '../store/actions/question.action';
import { Subject } from '../models/subject.model';
import { Question } from '../models/question.model';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private store: Store<Appstate>,
  ) { }
  // subjects handle
  getSubject() {
    return this.store.select('subject');
  }
  loadSubjects(user_id: string, page: number) {
    this.store.dispatch(new SubjectActions.LoadSubjects(user_id, page));
  }
  addSubject(subject: Subject) {
    this.store.dispatch(new SubjectActions.AddSubjects(subject));
  }
  removeSubject(subject_id: string) {
    this.store.dispatch(new SubjectActions.RemoveSubjects(subject_id));
  }
  // questions handle
  loadQuestions(author: string, subject_id, page) {
    this.store.dispatch(new QuestionActions.LoadQuestions(author,subject_id, page));
  }
  loadQuestion(id) {
    this.store.dispatch(new QuestionActions.LoadQuestion(id));
  }
  addQuestion(question: Question) {
    this.store.dispatch(new QuestionActions.AddQuestions(question));
  }
  editQuestion(qs_id: string, question: Question) {
    this.store.dispatch(new QuestionActions.EditQuestion(qs_id, question));
  }
  deleteQuestion(qs_id: string){
    this.store.dispatch(new QuestionActions.DelQuestion(qs_id));
  }
}
