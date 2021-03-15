
import { Test } from '../../models/test.model';
import * as TestActions from '../actions/test.action';

export interface TestState {
    loading: boolean,
    error: Error,
    list: Test[],
    test_id:string,
    testing: Test,
    isShareSuccess: boolean,
}

const initialState: TestState = {
    loading: false,
    error: undefined,
    list: [],
    test_id: '',
    testing:null,
    isShareSuccess: false,
}

export function testReducer(state: TestState = initialState, action: TestActions.action) {
    switch (action.type) {
        // load tests by subject_id
        case TestActions.LOAD_TESTS:
            return {
                ...state,
                loading: true,
            }
        case TestActions.LOAD_TESTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case TestActions.LOAD_TESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // load tests by test_id
        case TestActions.LOAD_TESTING:
            return {
                ...state,
                loading: true,
            }
        case TestActions.LOAD_TESTING_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                testing: action.payload,
                loading: false
            }
        case TestActions.LOAD_TESTING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // load tests by test_id and subject_id
        case TestActions.LOAD_DETAIL_TEST:
            return {
                ...state,
                loading: true,
            }
        case TestActions.LOAD_DETAIL_TEST_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                testing: action.payload,
                loading: false
            }
        case TestActions.LOAD_DETAIL_TEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        //add test
        case TestActions.ADD_TEST:
            return {
                ...state,
                loading: true,
            }
        case TestActions.ADD_TEST_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list:[...state.list, action.payload.newTest],
                test_id: action.payload.newTest_id,
                loading: false
            }
        case TestActions.ADD_TEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        // putTypeCode
        case TestActions.PUT_TYPE_CODE:
            return {
                ...state,
                loading: true,
            }
        case TestActions.PUT_TYPE_CODE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isShareSuccess: action.payload.success,
                loading: false
            }
        case TestActions.PUT_TYPE_CODE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        //delete test
        case TestActions.DELETE_TEST:
            return {
                ...state,
                loading: true,
            }
        case TestActions.DELETE_TEST_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list:state.list.filter(test => test._id != action.payload),
                loading: false
            }
        case TestActions.DELETE_TEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}