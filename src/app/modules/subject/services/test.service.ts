import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/states/subject.state';
import * as TestActions from '../store/actions/test.action';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private store: Store<Appstate>,
  ) { }
  getTests(){
    return this.store.select('subject');
  }
  loadTests(author: string, subject_id: string){
    this.store.dispatch(new TestActions.LoadTests(author, subject_id));
  }
  loadTesting(test_id: string){
    this.store.dispatch(new TestActions.LoadTesting(test_id));
  }
  loadDetaitTest(author: string, subject_id: string, test_id: string){
    this.store.dispatch(new TestActions.LoadDetailTest(author, subject_id, test_id));
  }
  addNewTest(newTest: Test){
    this.store.dispatch(new TestActions.AddTest(newTest));
  }
  putTypeCode(shareTest: {}){
    this.store.dispatch(new TestActions.PutTypeCode(shareTest));
  }
  deleteTest(test_id: string){
    this.store.dispatch(new TestActions.DelTest(test_id));
  }
}
