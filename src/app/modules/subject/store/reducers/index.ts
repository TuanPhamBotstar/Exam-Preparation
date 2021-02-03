import * as fromSubject from './subject.reducer';
import * as fromQuestion from './question.reducer';
import * as fromTest from './test.reducer';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';

export interface AppState {
    subject: fromSubject.SubjectState;
    question: fromQuestion.QuestionState;
    test: fromTest.TestState;
}

export const reducers: ActionReducerMap<AppState> = {
    subject: fromSubject.subjectReducer,
    question: fromQuestion.questionReducer,
    test: fromTest.testReducer,
}
