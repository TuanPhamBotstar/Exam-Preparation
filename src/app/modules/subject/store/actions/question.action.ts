
import { Action } from '@ngrx/store';
import { Question } from '../../models/question.model';



export const LOAD_QUESTIONS = '[QUESTION] Load Questions';
export const LOAD_QUESTIONS_SUCCESS = '[QUESTION] Load Questions Success';
export const LOAD_QUESTIONS_FAILURE = '[QUESTION] Load Questions Failure';

export const LOAD_QUESTION = '[QUESTION] Load Question';
export const LOAD_QUESTION_SUCCESS = '[QUESTION] Load Question Success';
export const LOAD_QUESTION_FAILURE = '[QUESTION] Load Question Failure';

export const ADD_QUESTION = '[QUESTION] Add Questions';
export const ADD_QUESTION_SUCCESS = '[QUESTION] Add Questions Success';
export const ADD_QUESTION_FAILURE = '[QUESTION] Add Questions Failure';

export const EDIT_QUESTION = '[QUESTION] Edit Question';
export const EDIT_QUESTION_SUCCESS = '[QUESTION] Edit Question Success';
export const EDIT_QUESTION_FAILURE = '[QUESTION] Edit Question Failure';

// load questions
export class LoadQuestions implements Action {
    readonly type = LOAD_QUESTIONS;
    constructor(public subject_id: string, public page: number) {}
}

export class LoadQuestionsSuccess implements Action {
    readonly type = LOAD_QUESTIONS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadQuestionsFailure implements Action {
    readonly type = LOAD_QUESTIONS_FAILURE;
    constructor(public payload: Error) { }
}
// load question
export class LoadQuestion implements Action {
    readonly type = LOAD_QUESTION;
    constructor(public id: string) {}
}

export class LoadQuestionSuccess implements Action {
    readonly type = LOAD_QUESTION_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadQuestionFailure implements Action {
    readonly type = LOAD_QUESTION_FAILURE;
    constructor(public payload: Error) { }
}
// add question
export class AddQuestions implements Action {
    readonly type = ADD_QUESTION;
    constructor(public payload: Question) { }
}

export class AddQuestionsSuccess implements Action {
    readonly type = ADD_QUESTION_SUCCESS;
    constructor(public payload: any) { }
}

export class AddQuestionsFailure implements Action {
    readonly type = ADD_QUESTION_FAILURE;
    constructor(public payload: Error) { }
}
// edit question
export class EditQuestion implements Action {
    readonly type = EDIT_QUESTION;
    constructor(public qs_id: string, public payload: Question) { }
}

export class EditQuestionSuccess implements Action {
    readonly type = EDIT_QUESTION_SUCCESS;
    constructor(public payload: any) { }
}

export class EditQuestionFailure implements Action {
    readonly type = EDIT_QUESTION_FAILURE;
    constructor(public payload: Error) { }
}
export type action = LoadQuestions | LoadQuestionsSuccess | LoadQuestionsFailure |
                     AddQuestions | AddQuestionsSuccess | AddQuestionsFailure |
                     LoadQuestion | LoadQuestionSuccess | LoadQuestionFailure |
                     EditQuestion | EditQuestionSuccess | EditQuestionFailure 
                    