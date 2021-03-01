import { Action } from '@ngrx/store';
import { Test } from '../../models/test.model';

// load tests by subject_id
export const LOAD_TESTS = '[TEST] Load Tests';
export const LOAD_TESTS_SUCCESS = '[TEST] Load Tests Success';
export const LOAD_TESTS_FAILURE = '[TEST] Load Tests Failure';
// load test by test_id
export const LOAD_TESTING = '[TEST] Load Testing';
export const LOAD_TESTING_SUCCESS = '[TEST] Load Testing Success';
export const LOAD_TESTING_FAILURE = '[TEST] Load Testing Failure';

// load detail test by test_id and subject_id
export const LOAD_DETAIL_TEST = '[TEST] Load Detail Test';
export const LOAD_DETAIL_TEST_SUCCESS = '[TEST] Load Detail Test Success';
export const LOAD_DETAIL_TEST_FAILURE = '[TEST] Load Detail Test Failure';

export const ADD_TEST = '[TEST] Add Test';
export const ADD_TEST_SUCCESS = '[TEST] Add Test Success';
export const ADD_TEST_FAILURE = '[TEST] Add Test Failure';

export const PUT_TYPE_CODE = '[TEST] Put Type Code';
export const PUT_TYPE_CODE_SUCCESS = '[TEST] Put Type Code Success';
export const PUT_TYPE_CODE_FAILURE = '[TEST] Put Type Code Failure';

export const DELETE_TEST = '[TEST] Delete Test';
export const DELETE_TEST_SUCCESS = '[TEST] Delete Test Success';
export const DELETE_TEST_FAILURE = '[TEST] Delete Test Failure';

// load tests by subject_id
export class LoadTests implements Action {
    readonly type = LOAD_TESTS;
    constructor(public author: string, public subject_id: string) { }
}
export class LoadTestsSuccess implements Action {
    readonly type = LOAD_TESTS_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadTestsFailure implements Action {
    readonly type = LOAD_TESTS_FAILURE;
    constructor(public payload: Error) { }
}
// load tests by test_id
export class LoadTesting implements Action {
    readonly type = LOAD_TESTING;
    constructor(public test_id: string) { }
}
export class LoadTestingSuccess implements Action {
    readonly type = LOAD_TESTING_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadTestingFailure implements Action {
    readonly type = LOAD_TESTING_FAILURE;
    constructor(public payload: Error) { }
}
// load detail test by test_id and subject_id
export class LoadDetailTest implements Action {
    readonly type = LOAD_DETAIL_TEST;
    constructor(public author: string, public subject_id: string, public test_id: string) { }
}
export class LoadDetailTestSuccess implements Action {
    readonly type = LOAD_DETAIL_TEST_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadDetailTestFailure implements Action {
    readonly type = LOAD_DETAIL_TEST_FAILURE;
    constructor(public payload: Error) { }
}
//  add test
export class AddTest implements Action {
    readonly type = ADD_TEST;
    constructor(public payload: Test) { }
}
export class AddTestSuccess implements Action {
    readonly type = ADD_TEST_SUCCESS;
    constructor(public payload: any) { }
}
export class AddTestFailure implements Action {
    readonly type = ADD_TEST_FAILURE;
    constructor(public payload: Error) { }
}
// PutTypeCode
export class PutTypeCode implements Action {
    readonly type = PUT_TYPE_CODE;
    constructor(public payload: {}) { }
}
export class PutTypeCodeSuccess implements Action {
    readonly type = PUT_TYPE_CODE_SUCCESS;
    constructor(public payload: any) { }
}
export class PutTypeCodeFailure implements Action {
    readonly type = PUT_TYPE_CODE_FAILURE;
    constructor(public payload: Error) { }
}
// delete test
export class DelTest implements Action {
    readonly type = DELETE_TEST;
    constructor(public test_id: string) { }
}
export class DelTestSuccess implements Action {
    readonly type = DELETE_TEST_SUCCESS;
    constructor(public payload: any) { }
}
export class DelTestFailure implements Action {
    readonly type = DELETE_TEST_FAILURE;
    constructor(public payload: Error) { }
}
export type action = LoadTests | LoadTestsSuccess | LoadTestsFailure |
                     LoadTesting | LoadTestingSuccess | LoadTestingFailure |
                     AddTest | AddTestSuccess | AddTestFailure |
                     DelTest | DelTestSuccess | DelTestFailure |
                     PutTypeCode | PutTypeCodeSuccess | PutTypeCodeFailure |
                     LoadDetailTest | LoadDetailTestSuccess | LoadDetailTestFailure