import { Action } from '@ngrx/store';
import { Test } from '../../models/test.model';

export const LOAD_TESTS = '[TEST] Load Tests';
export const LOAD_TESTS_SUCCESS = '[TEST] Load Tests Success';
export const LOAD_TESTS_FAILURE = '[TEST] Load Tests Failure';
export const ADD_TEST = '[TEST] Add Test';
export const ADD_TEST_SUCCESS = '[TEST] Add Test Success';
export const ADD_TEST_FAILURE = '[TEST] Add Test Failure';

// load tests
export class LoadTests implements Action {
    readonly type = LOAD_TESTS;
    constructor(public subject_id: string) { }
}
export class LoadTestsSuccess implements Action {
    readonly type = LOAD_TESTS_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadTestsFailure implements Action {
    readonly type = LOAD_TESTS_FAILURE;
    constructor(public payload: Error) { }
}
//  add test
export class AddTest implements Action {
    readonly type = ADD_TEST;
    constructor(public payload: Test) { }
}
export class AddTestSuccess implements Action {
    readonly type = ADD_TEST_SUCCESS;
    constructor(public payload: Test) { }
}
export class AddTestFailure implements Action {
    readonly type = ADD_TEST_FAILURE;
    constructor(public payload: Error) { }
}
export type action = LoadTests | LoadTestsSuccess | LoadTestsFailure |
                     AddTest | AddTestSuccess | AddTestFailure