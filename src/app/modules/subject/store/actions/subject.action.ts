
import { Action } from '@ngrx/store';
import { Subject } from '../../models/subject.model';


export const LOAD_SUBJECTS = '[SUBJECT] Load Subjects';
export const LOAD_SUBJECTS_SUCCESS = '[SUBJECT] Load Subjects Success';
export const LOAD_SUBJECTS_FAILURE = '[SUBJECT] Load Subjects Failure';

export const ADD_SUBJECTS = '[SUBJECT] Add Subjects';
export const ADD_SUBJECTS_SUCCESS = '[SUBJECT] Add Subjects Success';
export const ADD_SUBJECTS_FAILURE = '[SUBJECT] Add Subjects Failure';

export const LOAD_QUESTIONS = '[SUBJECT] Load Questions';
export const LOAD_QUESTIONS_SUCCESS = '[SUBJECT] Load Questions Success';
export const LOAD_QUESTIONS_FAILURE = '[SUBJECT] Load Questions Failure';
//  load subjects
export class LoadSubjects implements Action {
    readonly type = LOAD_SUBJECTS;
    constructor(public user_id: string, public page: number) {}
}

export class LoadSubjectsSuccess implements Action {
    readonly type = LOAD_SUBJECTS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadSubjectsFailure implements Action {
    readonly type = LOAD_SUBJECTS_FAILURE;
    constructor(public payload: Error) { }
}
//  add subject
export class AddSubjects implements Action {
    readonly type = ADD_SUBJECTS;
    constructor(public payload: Subject) {}
}

export class AddSubjectsSuccess implements Action {
    readonly type = ADD_SUBJECTS_SUCCESS;
    constructor(public payload: any) { }
}

export class AddSubjectsFailure implements Action {
    readonly type = ADD_SUBJECTS_FAILURE;
    constructor(public payload: Error) { }
}

export type action = LoadSubjects | LoadSubjectsSuccess | LoadSubjectsFailure |
                     AddSubjects | AddSubjectsSuccess | AddSubjectsFailure 

                    