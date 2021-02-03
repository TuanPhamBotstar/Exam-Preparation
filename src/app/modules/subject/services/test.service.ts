import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/states/subject.state';
import * as TestActions from '../store/actions/test.action';

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
  loadTests(subject_id: string){
    this.store.dispatch(new TestActions.LoadTests(subject_id));
  }
}
